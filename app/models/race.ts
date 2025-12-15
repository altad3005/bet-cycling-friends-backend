import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeSave } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Season from './season.js'
import Prediction from './prediction.js'
import GTTeam from '#models/gt_team'
import Startlist from '#models/startlist'
import RaceStage from '#models/race_stage'

export default class Race extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare type: string

  @column()
  declare multiplicator: number

  @column.date()
  declare startDate: DateTime | null

  @column.date()
  declare endDate: DateTime | null

  @column()
  declare maxBudget: number

  @column()
  declare seasonId: number

  @column()
  declare category?: string

  @column()
  declare edition?: number

  @column()
  declare nationality?: string

  @column()
  declare uciTour?: string

  @column()
  declare isOneDayRace?: boolean

  @column()
  declare isMonument?: boolean

  @column()
  declare year?: number

  @column()
  declare prevEditions?: string | null

  @hasMany(() => RaceStage)
  declare stages: HasMany<typeof RaceStage>

  @column()
  declare stagesWinners?: string | null

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @hasMany(() => Prediction)
  declare predictions: HasMany<typeof Prediction>

  @hasMany(() => GTTeam)
  declare gtTeams: HasMany<typeof GTTeam>

  @hasMany(() => Startlist)
  declare startlist: HasMany<typeof Startlist>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @beforeSave()
  static async attachToSeason(race: Race) {
    if (!race.year) return

    let season = await Season.query().where('year', race.year).first()

    if (!season) {
      season = await Season.create({
        year: race.year,
        startDate: DateTime.fromISO(`${race.year}-01-01`),
        endDate: DateTime.fromISO(`${race.year}-12-31`),
      })
    }

    race.seasonId = season.id
  }
}
