import User from '#models/user'
import League from '#models/league'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class LeaguePolicy extends BasePolicy {
  delete(user: User, league: League): AuthorizerResponse {
    return user.id === league.creatorId
  }

  viewInviteCode(user: User, league: League, role: string): AuthorizerResponse {
    return user.id === league.creatorId || role === 'admin'
  }
}
