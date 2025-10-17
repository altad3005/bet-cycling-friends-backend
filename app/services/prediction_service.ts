import Prediction from '#models/prediction'
import Race from '#models/race'
import { DateTime } from 'luxon'

export class PredictionService {
  async createPrediction(userId: number, raceId: number, favoriRider: string) {
    const race = await Race.findOrFail(raceId)
    if (race.startDate <= DateTime.now()) {
      throw new Error('Predictions are closed for this race.')
    }
    await Prediction.create({
      idUser: userId,
      idRace: raceId,
      favorite: favoriRider,
    })
  }

  async getPredictionById(predictionId: number) {
    return await Prediction.query().where('id', predictionId).firstOrFail()
  }

  async updatePrediction(predictionId: number, favoriteRider: string) {
    const prediction = await this.getPredictionById(predictionId)
    const race = await Race.findOrFail(prediction.idRace)
    if (race.startDate <= DateTime.now()) {
      throw new Error('Predictions are closed for this race.')
    }

    prediction.favorite = favoriteRider
    await prediction.save()
    return prediction
  }
}
