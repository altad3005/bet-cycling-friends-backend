import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Race from '#models/race'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export enum BonusType {
  FLAT_TIRE = 'flat_tire',
  BREAKAWAY = 'breakaway',
  COUNTER_PICK = 'counter_pick',
  CAPTAIN = 'captain',
  SWAP = 'swap',
  SUBSTITUTE = 'substitute',
}

export default class Prediction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare raceId: number

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>

  @column()
  declare riderName: string

  @column()
  declare bonusType: BonusType | null

  @column()
  declare bonusData: Record<string, any> | null

  @column({ consume: (value) => value ?? 0 })
  declare pointsEarned: number

  @column({ consume: (value) => value ?? false })
  declare isProcessed: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
