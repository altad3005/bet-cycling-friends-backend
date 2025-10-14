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

  async show({ params, bouncer }: HttpContext) {
    const prediction = await this.predictionService.getPredictionById(params.id)

    await bouncer.with('PredictionPolicy').authorize('view', prediction)

    return { data: prediction }
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { favoriteRider } = await request.validateUsing(UpdatePredictionValidator)
    const prediction = await this.predictionService.getPredictionById(params.id)

    await bouncer.with('PredictionPolicy').authorize('update', prediction)

    return await this.predictionService.updatePrediction(prediction.id, favoriteRider)
  }

  async destroy({ params, bouncer }: HttpContext) {
    const prediction = await this.predictionService.getPredictionById(params.id)

    await bouncer.with('PredictionPolicy').authorize('delete', prediction)

    await prediction.delete()
    return { message: 'Prediction deleted successfully' }
  }
}
