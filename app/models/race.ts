import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Season from './season.js'
import Prediction from './prediction.js'
import GTTeam from '#models/gt_team'
import Startlist from '#models/startlist'

export default class Race extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: string

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column()
  declare maxBudget: number

  @column()
  declare idSeason: number

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @hasMany(() => Prediction)
  declare predictions: HasMany<typeof Prediction>

  @hasMany(() => GTTeam)
  declare gtTeams: HasMany<typeof GTTeam>

  @hasMany(() => Startlist)
  declare startlist: HasMany<typeof Startlist>
}
