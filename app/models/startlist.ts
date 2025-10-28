import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Race from './race.js'

export default class Startlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare raceId: number

  @column()
  declare riderId: number | null

  @column()
  declare riderName: string | null

  @column()
  declare teamName: string | null

  @column()
  declare uciRank: number | null

  @column()
  declare country: string | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>
}
