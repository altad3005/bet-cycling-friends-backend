import type { HttpContext } from '@adonisjs/core/http'
import League from '#models/league'
import { LeagueService } from '#services/league_service'
import { inject } from '@adonisjs/core'
import { paramsValidator } from '#validators/league'

@inject()
export default class AdminController {
  constructor(private leagueService: LeagueService) {}
  async removeMember({ auth, bouncer, response, params }: HttpContext) {
    const { leagueId, userId } = await paramsValidator.validate(params)

    const user = await auth.authenticate()
    const league = await League.findOrFail(leagueId)
    const userLeague = await this.leagueService.getUserLeague(user.id, league.id)

    await bouncer.with('LeaguePolicy').authorize('manageMembers', league, userLeague)

    await this.leagueService.removeUserFromLeague(userId, league.id, user.id)
    return response.ok({ message: 'Member removed successfully' })
  }

  async promoteMember({ auth, bouncer, response, params }: HttpContext) {
    const user = await auth.authenticate()
    const league = await League.findOrFail(params.userId)
    const userLeague = await this.leagueService.getUserLeague(user.id, params.leagueId)

    await bouncer.with('LeaguePolicy').authorize('manageMembers', league, userLeague)

    const updatedMember = await this.leagueService.updateUserRole(
      params.userId,
      params.leagueId,
      'admin'
    )
    return response.ok({ message: 'Member promoted successfully', data: updatedMember })
  }
}
