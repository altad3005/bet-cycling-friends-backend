import User from '#models/user'
import League from '#models/league'
import LeagueMember from '#models/league_member'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class LeaguePolicy extends BasePolicy {
  delete(user: User, league: League, userLeague: LeagueMember | null): AuthorizerResponse {
    return user.id === league.creatorId || userLeague?.role === 'admin'
  }

  viewInviteCode(user: User, league: League, userLeague: LeagueMember | null): AuthorizerResponse {
    return user.id === league.creatorId || userLeague?.role === 'admin'
  }

  manageMembers(user: User, league: League, userLeague: LeagueMember | null): AuthorizerResponse {
    return user.id === league.creatorId || userLeague?.role === 'admin'
  }
}
