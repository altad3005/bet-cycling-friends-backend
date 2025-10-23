import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Race from '#models/race'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RaceResult extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare raceId: number

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>

  @column()
  declare stageNumber: string | null

  @column()
  declare riderName: string

  @column()
  declare riderUrl: string

  @column()
  declare teamName: string

  @column()
  declare teamUrl: string

  @column()
  declare nationality: string

  @column()
  declare rank: number

  @column()
  declare prevRank: number | null

  @column()
  declare age: number

  @column()
  declare pcsPoints: number

  @column()
  declare uciPoints: number

  @column()
  declare riderNumber: number

  @column()
  declare time: string

  @column()
  declare bonusTime: string | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
