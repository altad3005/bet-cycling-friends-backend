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

  async getRoleUser(userId: number, leagueId: number) {
    const membership = await UserLeague.query()
      .where('user_id', userId)
      .andWhere('league_id', leagueId)
      .first()

    return membership ? membership.role : 'member'
  }
}
