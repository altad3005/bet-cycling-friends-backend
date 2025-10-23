import Race from '#models/race'
import { RaceService } from '#services/race_service'
import Prediction from '#models/prediction'
import GTTeam from '#models/gt_team'
import { GcResultDto } from '../../dto/result/gc_result_dto.js'

export class ResultCorrectionService {
  constructor(private raceService: RaceService) {}

  async correctRaceResults(raceId: number): Promise<void> {
    const race = await Race.findOrFail(raceId)
    const results: GcResultDto[] = await this.raceService.fetchResultsGc(
      race.slug,
      race.endDate.year
    )

    const predictions = await Prediction.query().where('raceId', raceId)

    for (const prediction of predictions) {
      const favoritePoints = this.calculatePoints(prediction.favoriteRider, results)
      const bonusPoints = this.calculatePoints(prediction.bonusRider, results)

      prediction.pointsEarned = favoritePoints + bonusPoints
      prediction.placementFavoriteRider = this.getPlacement(prediction.favoriteRider, results)
      prediction.placementBonusRider = this.getPlacement(prediction.bonusRider, results)
    }
  }

  async correctGTStageResults(raceId: number, stageNumber: string, year: number) {
    const race = await Race.findOrFail(raceId)
    const raceResults = await this.raceService.fetchResultsStage(race.slug, stageNumber, year)

    const teams = await GTTeam.query()
      .whereHas('race', (q) => q.where('id', raceId))
      .preload('riders')

    for (const team of teams) {
      let totalTeamPoints = 0

      for (const rider of team.riders) {
        const result = raceResults.find((r) => r.riderName === rider.riderName)
        if (!result) continue

        const points = this.calculateStagePoints(result.rank)
        rider.pointsEarned += points
        totalTeamPoints += points
        await rider.save()
      }

      team.merge({ pointsEarned: totalTeamPoints })
      await team.save()
    }
  }

  private calculatePoints(riderName: string | null, results: GcResultDto[]): number {
    if (!riderName) return 0
    const rider = results.find((r) => r.riderName === riderName)
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

  private getPlacement(riderName: string | null, results: GcResultDto[]): number {
    if (!riderName) return 0
    const rider = results.find((r) => r.riderName === riderName)
    return rider ? rider.rank : 0
  }
}
