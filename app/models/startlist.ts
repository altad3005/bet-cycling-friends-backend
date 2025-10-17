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
  declare rider_id: number

  @column()
  declare rider_name: string

  @column()
  declare team_name: string

  @column()
  declare uci_rank: number

  @column()
  declare country: string

  @column.dateTime()
  declare updated_at: DateTime

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>
}
