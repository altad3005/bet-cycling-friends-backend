import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Prediction from './prediction.js'
import Bonus from './bonus.js'
import User from '#models/user'

export default class PredictionBonus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idPrediction: number

  @column()
  declare idBonus: number

  @column()
  declare targetUserId: number | null

  @column.date()
  declare applicationDate: DateTime

  @belongsTo(() => Prediction)
  declare prediction: BelongsTo<typeof Prediction>

  @belongsTo(() => Bonus)
  declare bonus: BelongsTo<typeof Bonus>

  @belongsTo(() => User)
  declare targetUser: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
