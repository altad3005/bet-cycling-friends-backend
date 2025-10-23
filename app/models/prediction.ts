import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Race from './race.js'
import Bonus from '#models/bonus'
import PredictionBonus from '#models/prediction_bonus'

export default class Prediction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idUser: number

  @column()
  declare idRace: number

  @column()
  declare favoriteRider: string

  @column()
  declare placementFavoriteRider: number

  @column()
  declare bonusRider: string

  @column()
  declare placementBonusRider: number

  @column()
  declare idBonus: number | null

  @column.date()
  declare predictionDate: DateTime

  @column()
  declare pointsEarned: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>

  @belongsTo(() => Bonus)
  declare bonus: BelongsTo<typeof Bonus>

  @hasMany(() => PredictionBonus)
  declare predictionBonuses: HasMany<typeof PredictionBonus>
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

}
