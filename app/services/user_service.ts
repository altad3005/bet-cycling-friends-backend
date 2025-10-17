import LeagueMember from '#models/league_member'

export class UserService {
  async getUserLeagues(userId: number) {
    return LeagueMember.query()
      .where('user_id', userId)
      .preload('league', (leagueQuery) => {
        leagueQuery.preload('creator')
      })
      .orderBy('joined_at', 'desc')
  }
}
