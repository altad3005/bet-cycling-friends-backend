import Prediction from '#models/prediction'

export class PredictionService {
  async createPrediction(userId: number, raceId: number, favoriRider: string) {
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
    prediction.riderName = favoriteRider
    await prediction.save()
    return prediction
  }
}
