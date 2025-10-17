import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Bonus from './bonus.js'

export default class UserBonus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idUser: number

  @column()
  declare idBonus: number

  @column.date()
  declare attributionDate: DateTime

  @column()
  declare bonusPoints: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Bonus)
  declare bonus: BelongsTo<typeof Bonus>
}
