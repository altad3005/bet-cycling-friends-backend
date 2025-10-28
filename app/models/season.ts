import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import League from './league.js'
import Race from './race.js'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare year: number

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @hasMany(() => League)
  declare leagues: HasMany<typeof League>

  @hasMany(() => Race)
  declare races: HasMany<typeof Race>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
