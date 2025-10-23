import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Race from './race.js'
import GTTeamRider from './gt_team_rider.js'
import { DateTime } from 'luxon'

export default class GTTeam extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idUser: number

  @column()
  declare idRace: number

  @column()
  declare pointsEarned: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Race)
  declare race: BelongsTo<typeof Race>

  @hasMany(() => GTTeamRider)
  declare riders: HasMany<typeof GTTeamRider>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
