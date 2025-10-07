import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import UserLeague from '#models/user_league'
import User from '#models/user'
import { randomUUID } from 'node:crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class League extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare inviteCode: string

  @beforeCreate()
  static assignInviteCode(league: League) {
    league.inviteCode = league.inviteCode || randomUUID().slice(0, 8)
  }

  @column()
  declare isPublic: boolean

  @column({
    serialize: (value) => value,
    prepare: (value) => JSON.stringify(value),
  })
  declare settings: Record<string, any>

  @column()
  declare creatorId: number

  @belongsTo(() => User, {
    foreignKey: 'creatorId',
  })
  declare creator: BelongsTo<typeof User>

  @hasMany(() => UserLeague)
  declare userLeagues: HasMany<typeof UserLeague>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
