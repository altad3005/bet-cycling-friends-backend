import League from '#models/league'
import User from '#models/user'

export class LeagueService {
  async createLeague(payload: any, user: User) {
    return League.create({ ...payload, creatorId: user.id })
  }
}
