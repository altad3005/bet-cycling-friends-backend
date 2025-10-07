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
        },
        { client: trx }
      )

      return league
    })
  }
}
