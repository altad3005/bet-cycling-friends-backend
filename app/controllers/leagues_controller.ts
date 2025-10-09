import type { HttpContext } from '@adonisjs/core/http'
import League from '#models/league'
import { createLeagueValidator, joinLeagueValidator } from '#validators/league'
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

  async show({ auth, bouncer, params, response }: HttpContext) {
    const user = await auth.authenticate().catch(() => null)
    const league = await League.findOrFail(params.id)

    let canViewInviteCode = false

    if (user) {
      const userLeague = await this.leagueService.getUserLeague(user.id, league.id)
      canViewInviteCode = await bouncer
        .with('LeaguePolicy')
        .allows('viewInviteCode', league, userLeague)
    }

    return response.ok(league.serializeForUser(canViewInviteCode))
  }

  async destroy({ auth, bouncer, params, response }: HttpContext) {
    const user = await auth.authenticate()
    const league = await League.findOrFail(params.id)
    const userLeague = await this.leagueService.getUserLeague(user.id, league.id)

    await bouncer.with('LeaguePolicy').authorize('delete', league, userLeague)

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

  async removeMember({ auth, bouncer, params, response }: HttpContext) {
    const user = await auth.authenticate()
    const league = await League.findOrFail(params.leagueId)
    const userLeague = await this.leagueService.getUserLeague(user.id, league.id)

    await bouncer.with('LeaguePolicy').authorize('manageMembers', league, userLeague)

    await this.leagueService.removeUserFromLeague(params.userId, league.id)
    return response.noContent()
  }

  async promoteMember({ auth, bouncer, params, response }: HttpContext) {
    const user = await auth.authenticate()
    const league = await League.findOrFail(params.leagueId)
    const userLeague = await this.leagueService.getUserLeague(user.id, league.id)

    await bouncer.with('LeaguePolicy').authorize('manageMembers', league, userLeague)

    const updatedMember = await this.leagueService.updateUserRole(params.userId, league.id, 'admin')
    return response.ok(updatedMember)
  }
}
