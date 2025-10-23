import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Race from './race.js'

export default class Startlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare race_id: number

  @column()
  declare rider_id: number | null

  @column()
  declare rider_name: string | null

  @column()
  declare team_name: string | null

  @column()
  declare uci_rank: number | null

  @column()
  declare country: string | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>
}
