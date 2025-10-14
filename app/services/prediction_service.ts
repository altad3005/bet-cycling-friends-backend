import Prediction from '#models/prediction'
import Race from '#models/race'
import { DateTime } from 'luxon'

export class PredictionService {
  async createPrediction(userId: number, raceId: number, favoriRider: string) {
    const race = await Race.findOrFail(raceId)
    if (race.predictionDeadline <= DateTime.now()) {
      throw new Error('Predictions are closed for this race.')
    }
    await Prediction.create({
      userId: userId,
      raceId: raceId,
      riderName: favoriRider,
    })
  }

  async getPredictionById(predictionId: number) {
    return await Prediction.query().where('id', predictionId).firstOrFail()
  }

  async updatePrediction(predictionId: number, favoriteRider: string) {
    const prediction = await this.getPredictionById(predictionId)
    const race = await Race.findOrFail(prediction.raceId)
    if (race.predictionDeadline <= DateTime.now()) {
      throw new Error('Predictions are closed for this race.')
    }

    prediction.riderName = favoriteRider
    await prediction.save()
    return prediction
  }
}
