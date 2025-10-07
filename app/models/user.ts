import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import UserLeague from '#models/user_league'
import League from '#models/league'
import Prediction from '#models/prediction'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare pseudo: string

  @column()
  declare avatarUrl: string | null

  @column()
  declare notifications: boolean

  @column({
    serialize: (value) => value,
    prepare: (value) => JSON.stringify(value),
  })
  declare preferences: Record<string, any> | null

  @column()
  declare role: string

  @hasMany(() => League, {
    foreignKey: 'creatorId',
  })
  declare createdLeagues: HasMany<typeof League>

  @hasMany(() => UserLeague)
  declare userLeagues: HasMany<typeof UserLeague>

  @hasMany(() => Prediction)
  declare predictions: HasMany<typeof Prediction>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
