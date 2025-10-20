import Race from '#models/race'
import Prediction from '#models/prediction'
import { RaceService } from '#services/race_service'
import { RaceResultDto } from '../../dto/race_result_dto.js'

export class ResultCorrectionService {
  constructor(private raceService: RaceService) {}

  async correctRaceResults(raceId: number): Promise<void> {
    const race = await Race.findOrFail(raceId)
    const results: RaceResultDto[] = await this.raceService.fetchResultsGc(
      race.slug,
      race.endDate.year
    )

    const predictions = await Prediction.query().where('raceId', raceId)

    const resultMap = new Map(results.map((r) => [r.riderName, r]))

    for (const prediction of predictions) {
      const favorite = resultMap.get(prediction.favoriteRider)
      const bonus = resultMap.get(prediction.bonusRider)

      prediction.pointsEarned = this.calculatePoints(favorite) + this.calculatePoints(bonus)
      prediction.placementFavoriteRider = favorite?.rank ?? 0
      prediction.placementBonusRider = bonus?.rank ?? 0
      await prediction.save()
    }
  }

  private calculatePoints(rider?: RaceResultDto): number {
    if (!rider) return 0
    const rank = rider.rank
    if (rank === 1) return 50
    if (rank === 2) return 30
    if (rank === 3) return 20
    if (rank >= 4 && rank <= 10) return 11 - rank
    return 0
  }
}
