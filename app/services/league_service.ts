import db from '@adonisjs/lucid/services/db'
import League from '#models/league'
import UserLeague from '#models/user_league'

export class LeagueService {
  async createLeagueWithCreator(payload: any, creatorId: number) {
    return await db.transaction(async (trx) => {
      const league = await League.create(
        {
          ...payload,
          creatorId,
        },
        { client: trx }
      )

      await UserLeague.create(
        {
          userId: creatorId,
          leagueId: league.id,
          role: 'admin',
        },
        { client: trx }
      )

      return league
    })
  }

  async addUserToLeagueByCode(param: { leagueId: number; inviteCode: string; userId: number }) {
    const { leagueId, inviteCode, userId } = param
    const league = await League.findByOrFail('id', leagueId)

    if (league.inviteCode !== inviteCode) {
      throw new Error('Invalid invite code')
    }

    const existingMembership = await UserLeague.query()
      .where('user_id', userId)
      .andWhere('league_id', leagueId)
      .first()

    if (existingMembership) {
      throw new Error('User is already a member of this league')
    }

    return await UserLeague.create({
      userId,
      leagueId,
    })
  }

  async getUserLeague(userId: number, leagueId: number): Promise<UserLeague | null> {
    return await UserLeague.query().where('user_id', userId).andWhere('league_id', leagueId).first()
  }

  async removeUserFromLeague(
    targetUserId: number,
    leagueId: number,
    currentUserId?: number
  ): Promise<void> {
    if (currentUserId && targetUserId === currentUserId) {
      throw new Error('Vous ne pouvez pas vous retirer vous-même de la ligue.')
    }

    const userLeague = await UserLeague.query()
      .where('user_id', targetUserId)
      .andWhere('league_id', leagueId)
      .first()

    if (!userLeague) {
      throw new Error('User is not a member of this league')
    }

    await userLeague.delete()
  }

  async updateUserRole(userId: number, leagueId: number, newRole: string): Promise<UserLeague> {
    const userLeague = await UserLeague.query()
      .where('user_id', userId)
      .andWhere('league_id', leagueId)
      .firstOrFail()

    userLeague.role = newRole
    await userLeague.save()

    return userLeague
  }
}
