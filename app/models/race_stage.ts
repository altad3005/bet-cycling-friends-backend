import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Race from './race.js'

export default class RaceStage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare raceId: number

  @column()
  declare stageName: string

  @column()
  declare stageUrl?: string

  @column()
  declare profileIcon?: string

  @column()
  declare date?: string

  @column()
  declare stageNumber?: number

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>
}
