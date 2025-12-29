import LeagueMember from '#models/league_member'
import User from '#models/user'

export class UserService {
  async getUserLeagues(userId: number) {
    return LeagueMember.query()
      .where('user_id', userId)
      .preload('league', (leagueQuery) => {
        leagueQuery.preload('creator')
      })
      .orderBy('joined_at', 'desc')
  }

  async updateUser(user: User, avatarUrl?: string | null, notificationPreferences?: string | null) {
    if (avatarUrl !== undefined) {
      user.avatarUrl = avatarUrl
    }
    
    if (notificationPreferences !== undefined) {
      user.notificationPreferences = notificationPreferences
    }

    await user.save()
    return user
  }

  async deleteUser(user: User){
    await user.delete()
    return 
  }
}
