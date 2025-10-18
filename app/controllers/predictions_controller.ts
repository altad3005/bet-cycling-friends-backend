import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PredictionService } from '#services/prediction_service'
import { CreatePredictionValidator, UpdatePredictionValidator } from '#validators/prediction'

@inject()
export default class PredictionsController {
  constructor(private predictionService: PredictionService) {}

  async store({ request, auth, params, response }: HttpContext) {
    const { favoriteRider } = await request.validateUsing(CreatePredictionValidator)
    const raceId = params.raceId
    const user = await auth.authenticate()

    await this.predictionService.createPrediction(user.id, raceId, favoriteRider)

    return response.created({ message: 'Prediction created successfully' })
  }

  async show({ params, bouncer, response }: HttpContext) {
    const prediction = await this.predictionService.getPredictionById(params.id)

    await bouncer.with('PredictionPolicy').authorize('view', prediction)

    return response.ok({ message: 'Prediction retrieved successfully', data: prediction })
  }

  async update({ params, request, bouncer, response }: HttpContext) {
    const { favoriteRider } = await request.validateUsing(UpdatePredictionValidator)
    const prediction = await this.predictionService.getPredictionById(params.id)

    await bouncer.with('PredictionPolicy').authorize('update', prediction)

    await this.predictionService.updatePrediction(prediction.id, favoriteRider)

    return response.ok({ message: 'Updated successfully', data: prediction })
  }

  async destroy({ params, bouncer, response }: HttpContext) {
    const prediction = await this.predictionService.getPredictionById(params.id)

    await bouncer.with('PredictionPolicy').authorize('delete', prediction)

    await prediction.delete()

    return response.ok({ message: 'Deleted successfully', data: prediction })
  }
}
