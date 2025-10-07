import type { HttpContext } from '@adonisjs/core/http'
import League from '#models/league'
import { createLeagueValidator } from '#validators/league'
import { inject } from '@adonisjs/core'
import { LeagueService } from '#services/league_service'

@inject()
export default class LeaguesController {
  constructor(private leagueService: LeagueService) {}

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createLeagueValidator)
    const user = await auth.authenticate()

    const league = await this.leagueService.createLeagueWithCreator(payload, user.id)

    return response.created(league)
  }

  async show({ params, response }: HttpContext) {
    const league = await League.findOrFail(params.id)
    return response.ok(league)
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    const league = await League.findOrFail(params.id)
    await bouncer.with('LeaguePolicy').authorize('delete', league)

    await league.delete()
    return response.noContent()
  }
}
