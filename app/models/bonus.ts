import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PredictionBonus from '#models/prediction_bonus'
import UserBonus from '#models/user_bonus'
import { DateTime } from 'luxon'

export default class Bonus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare type: string

  @column()
  declare effect: string

  @column()
  declare seasonLimit: number | null

  @column()
  declare raceLimit: number | null

  @column()
  declare attributionCondition: string | null

  @hasMany(() => PredictionBonus)
  declare predictionBonuses: HasMany<typeof PredictionBonus>

  @hasMany(() => UserBonus)
  declare userBonuses: HasMany<typeof UserBonus>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
