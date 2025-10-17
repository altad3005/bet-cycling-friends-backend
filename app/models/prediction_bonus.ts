import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Prediction from './prediction.js'
import Bonus from './bonus.js'

export default class PredictionBonus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idPrediction: number

  @column()
  declare idBonus: number

  @column.date()
  declare applicationDate: DateTime

  @belongsTo(() => Prediction)
  declare prediction: BelongsTo<typeof Prediction>

  @belongsTo(() => Bonus)
  declare bonus: BelongsTo<typeof Bonus>
}
