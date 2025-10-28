import type { HttpContext } from '@adonisjs/core/http'
import Bonus from '#models/bonus'

export default class BonusesController {
  // TODO: plutot afficher les bonus restants de l'utilisateur connecté
  async index({ response }: HttpContext) {
    const bonuses = await Bonus.all()
    return response.ok({ message: 'Bonuses retrieved successfully', data: bonuses })
  }

  async show({ params, response }: HttpContext) {
    const bonus = await Bonus.findOrFail(params.id)
    return response.ok({ message: 'Bonus retrieved successfully', data: bonus })
  }
}
