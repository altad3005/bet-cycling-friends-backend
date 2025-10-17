import Prediction from '#models/prediction'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PredictionPolicy extends BasePolicy {
  view(user: { id: number }, prediction: Prediction): AuthorizerResponse {
    return prediction.idUser === user.id
  }

  update(user: { id: number }, prediction: Prediction): AuthorizerResponse {
    return prediction.idUser === user.id
  }

  delete(user: { id: number }, prediction: Prediction): AuthorizerResponse {
    return prediction.idUser === user.id
  }
}
