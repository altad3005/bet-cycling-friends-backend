import Prediction from '#models/prediction'
import Race from '#models/race'
import { DateTime } from 'luxon'

export class PredictionService {
  async createPrediction(userId: number, raceId: number, favoriRider: string, bonusRider: string) {
    const race = await Race.findOrFail(raceId)

    if (!race.startDate) {
      throw new Error('Cannot create a prediction: race start date is unknown.')
    }

    if (race.startDate <= DateTime.now()) {
      throw new Error('Predictions are closed for this race.')
    }
    await Prediction.create({
      idUser: userId,
      idRace: raceId,
      favoriteRider: favoriRider,
      bonusRider: bonusRider,
    })
  }

  async getPredictionById(predictionId: number) {
    return await Prediction.query().where('id', predictionId).firstOrFail()
  }

  async updatePrediction(predictionId: number, favoriteRider: string, bonusRider: string) {
    const prediction = await this.getPredictionById(predictionId)
    const race = await Race.findOrFail(prediction.idRace)

    if (!race.startDate) {
      throw new Error('Cannot create a prediction: race start date is unknown.')
    }

    if (race.startDate <= DateTime.now()) {
      throw new Error('Predictions are closed for this race.')
    }

    prediction.favoriteRider = favoriteRider
    prediction.bonusRider = bonusRider
    await prediction.save()
    return prediction
  }
}
