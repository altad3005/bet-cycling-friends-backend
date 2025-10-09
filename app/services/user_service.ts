import UserLeague from '#models/user_league'

export class UserService {
  async getUserLeagues(userId: number) {
    return UserLeague.query()
      .where('user_id', userId)
      .preload('league', (leagueQuery) => {
        leagueQuery.preload('creator')
      })
      .orderBy('joined_at', 'desc')
  }
}
