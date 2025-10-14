import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PredictionService } from '#services/prediction_service'
import { CreatePredictionValidator, UpdatePredictionValidator } from '#validators/prediction'

@inject()
export default class PredictionsController {
  constructor(private predictionService: PredictionService) {}

  async store({ request, auth, params }: HttpContext) {
    const { favoriteRider } = await request.validateUsing(CreatePredictionValidator)
    const raceId = params.raceId
    const user = await auth.authenticate()

    return await this.predictionService.createPrediction(user.id, raceId, favoriteRider)
  }

  async show({ params }: HttpContext) {
    const predictionId = params.id
    const prediction = await this.predictionService.getPredictionById(predictionId)
    return { data: prediction }
  }

  async update({ params, request }: HttpContext) {
    const { favoriteRider } = await request.validateUsing(UpdatePredictionValidator)
    const predictionId = params.id
    return await this.predictionService.updatePrediction(predictionId, favoriteRider)
  }

  async destroy({ params }: HttpContext) {
    const predictionId = params.id
    const prediction = await this.predictionService.getPredictionById(predictionId)
    await prediction.delete()
    return { message: 'Prediction deleted successfully' }
  }
}
