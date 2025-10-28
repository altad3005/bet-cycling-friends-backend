import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import LeagueMember from '#models/league_member'
import User from '#models/user'
import { randomUUID } from 'node:crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Season from '#models/season'

export default class League extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @computed({ serializeAs: 'inviteCode' })
  declare inviteCode: string

  @beforeCreate()
  static assignInviteCode(league: League) {
    league.inviteCode = league.inviteCode || randomUUID().slice(0, 8)
  }

  @column()
  declare creatorId: number

  @belongsTo(() => User, {
    foreignKey: 'creatorId',
  })
  declare creator: BelongsTo<typeof User>

  @hasMany(() => LeagueMember)
  declare members: HasMany<typeof LeagueMember>

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @computed()
  public get displayInviteCode(): string | null {
    return this.$extras.canViewInviteCode ? this.inviteCode : null
  }

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
