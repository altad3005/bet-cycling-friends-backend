import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Prediction from '#models/prediction'

export enum RaceType {
  ONE_DAY = 'one_day',
  STAGE = 'stage',
  GRAND_TOUR = 'grand_tour',
}

export enum RaceStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  FINISHED = 'finished',
}

export default class Race extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare type: RaceType

  @column()
  declare status: RaceStatus

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime | null

  @column.dateTime()
  declare predictionDeadline: DateTime

  @column({
    serialize: (value) => value,
    prepare: (value) => JSON.stringify(value),
  })
  declare startlist: string[] | null

  @column({
    serialize: (value) => value,
    prepare: (value) => JSON.stringify(value),
  })
  declare results: Record<string, any> | null

  @column({
    serialize: (value) => value,
    prepare: (value) => JSON.stringify(value),
  })
  declare profile: Record<string, any> | null

  @hasMany(() => Prediction)
  declare predictions: HasMany<typeof Prediction>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
