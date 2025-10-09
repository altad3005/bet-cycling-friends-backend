import type { HttpContext } from '@adonisjs/core/http'
import League from '#models/league'
import { createLeagueValidator, joinLeagueValidator } from '#validators/league'
import { inject } from '@adonisjs/core'
import { LeagueService } from '#services/league_service'

@inject()
export default class LeaguesController {
  constructor(private leagueService: LeagueService) {}

  async store({ request, auth, response }: HttpContext) {
    // TODO: add type for payload
    const payload = await request.validateUsing(createLeagueValidator)
    const user = await auth.authenticate()

    const league = await this.leagueService.createLeagueWithCreator(payload, user.id)

    return response.created(league)
  }

  async show({ auth, bouncer, params, response }: HttpContext) {
    const user = await auth.authenticate().catch(() => null)
    const league = await League.findOrFail(params.id)

    let canViewInviteCode = false

    if (user) {
      const role = await this.leagueService.getRoleUser(user.id, league.id)
      canViewInviteCode = await bouncer.with('LeaguePolicy').allows('viewInviteCode', league, role)
    }

    return response.ok(league.serializeForUser(canViewInviteCode))
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    const league = await League.findOrFail(params.id)
    await bouncer.with('LeaguePolicy').authorize('delete', league)

    await league.delete()
    return response.noContent()
  }

  async joinByCode({ auth, request, response }: HttpContext) {
    const { leagueId, inviteCode } = await request.validateUsing(joinLeagueValidator)
    const user = await auth.authenticate()

    const joinedLeague = await this.leagueService.addUserToLeagueByCode({
      leagueId: leagueId,
      inviteCode: inviteCode,
      userId: user.id,
    })
    return response.ok(joinedLeague)
  }
}
