import type { HttpContext } from '@adonisjs/core/http'
import League from '#models/league'
import { createLeagueValidator } from '#validators/league'
import { inject } from '@adonisjs/core'
import { LeagueService } from '#services/league_service'

@inject()
export default class LeaguesController {
  constructor(private leagueService: LeagueService) {}
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const leagues = await League.query().paginate(page, limit)
    return response.ok({ leagues })
  }
  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createLeagueValidator)
    const user = await auth.authenticate()

    const league = await this.leagueService.createLeague(payload, user)
    return response.created(league)
  }
  async show({ params, response }: HttpContext) {
    const league = await League.find(params.id)
    if (!league) {
      return response.notFound({ error: 'League not found' })
    }

    return response.ok(league)
  }
  async destroy({ bouncer, params, response }: HttpContext) {
    const league = await League.findOrFail(params.id)
    try {
      await bouncer.with('LeaguePolicy').authorize('delete', league)
    } catch {
      return response.forbidden({ error: 'Not authorized to delete this league' })
    }
    await league.delete()
    return response.noContent()
  }
}
