import User from '#models/user'
import League from '#models/league'
import UserLeague from '#models/user_league'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class LeaguePolicy extends BasePolicy {
  delete(user: User, league: League, userLeague: UserLeague | null): AuthorizerResponse {
    return user.id === league.creatorId || userLeague?.role === 'admin'
  }

  viewInviteCode(user: User, league: League, userLeague: UserLeague | null): AuthorizerResponse {
    return user.id === league.creatorId || userLeague?.role === 'admin'
  }

  manageMembers(user: User, league: League, userLeague: UserLeague | null): AuthorizerResponse {
    return user.id === league.creatorId || userLeague?.role === 'admin'
  }
}
