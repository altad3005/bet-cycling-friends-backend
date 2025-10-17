import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import LeagueMember from '#models/league_member'
import Prediction from '#models/prediction'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserBonus from '#models/user_bonus'
import GTTeam from '#models/gt_team'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pseudo: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare avatarUrl: string | null

  @column()
  declare notificationPreferences: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => LeagueMember)
  declare userLeagues: HasMany<typeof LeagueMember>

  @hasMany(() => Prediction)
  declare predictions: HasMany<typeof Prediction>

  @hasMany(() => UserBonus)
  declare bonuses: HasMany<typeof UserBonus>

  @hasMany(() => GTTeam)
  declare gtTeams: HasMany<typeof GTTeam>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
