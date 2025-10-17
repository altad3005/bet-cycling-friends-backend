import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import League from '#models/league'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class LeagueMember extends BaseModel {
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

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare joinedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
