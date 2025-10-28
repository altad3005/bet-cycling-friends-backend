import Race from '#models/race'
import Prediction from '#models/prediction'
import GTTeam from '#models/gt_team'
import RaceResult from '#models/race_result'
import { RaceService } from '#services/race_service'

export class ResultCorrectionService {
  constructor(private raceService: RaceService) {}

  async correctRaceResults(raceId: number): Promise<void> {
    const race = await Race.findOrFail(raceId)

    let results = await this.raceService.getResultsGc(race.id)

    const predictions = await Prediction.query().where('raceId', raceId)
    const resultMap = new Map(results.map((r) => [r.riderName, r]))

    for (const prediction of predictions) {
      const favorite = resultMap.get(prediction.favoriteRiderName)
      const bonus = resultMap.get(prediction.bonusRiderName)

      prediction.pointsEarned = this.calculateGcPoints(favorite) + this.calculateGcPoints(bonus)
      prediction.placementFavoriteRider = favorite?.rank ?? 0
      prediction.placementBonusRider = bonus?.rank ?? 0

      await prediction.save()
    }
  }

  async correctGTStageResults(raceId: number, stageNumber: string): Promise<void> {
    const race = await Race.findOrFail(raceId)

    let stageResults = await this.raceService.getResultsStage(race.id, stageNumber)

    const teams = await GTTeam.query()
      .whereHas('race', (q) => q.where('id', raceId))
      .preload('riders')

    for (const team of teams) {
      let totalTeamPoints = 0

      for (const rider of team.riders) {
        const result = stageResults.find((r) => r.riderName === rider.riderName)
        if (!result) continue

        const points = this.calculateStagePoints(result.rank)
        rider.pointsEarned += points
        totalTeamPoints += points
        await rider.save()
      }

      team.merge({ totalPoints: totalTeamPoints })
      await team.save()
    }
  }

  private calculateGcPoints(rider?: RaceResult): number {
    if (!rider) return 0
    const rank = rider.rank
    if (rank === 1) return 50
    if (rank === 2) return 30
    if (rank === 3) return 20
    if (rank >= 4 && rank <= 10) return 11 - rank
    return 0
  }

  private calculateStagePoints(rank: number): number {
    if (rank === 1) return 35
    if (rank <= 10) return 10
    return 0
  }
}
