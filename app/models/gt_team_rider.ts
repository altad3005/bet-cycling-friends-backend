import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import GTTeam from './gt_team.js'
import { DateTime } from 'luxon'

export default class GTTeamRider extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idGTTeam: number

  @column()
  declare riderName: string

  @column()
  declare price: number

  @column()
  declare role: string | null

  @column()
  declare pointsEarned: number

  @belongsTo(() => GTTeam)
  declare team: BelongsTo<typeof GTTeam>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
