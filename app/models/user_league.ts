import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import League from '#models/league'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserLeague extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare leagueId: number

  @belongsTo(() => League)
  declare league: BelongsTo<typeof League>

  @column({ consume: (value) => value ?? 0 })
  declare totalPoints: number

  @column({ consume: (value) => value ?? 0 })
  declare exactWins: number

  @column({ consume: (value) => value ?? 0 })
  declare podiums: number

  @column({ consume: (value) => value ?? 0 })
  declare longestStreak: number

  @column.dateTime()
  declare joinedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
