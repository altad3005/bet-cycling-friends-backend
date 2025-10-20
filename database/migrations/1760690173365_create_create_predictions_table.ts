import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Predictions extends BaseSchema {
  protected tableName = 'predictions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('race_id').unsigned().references('id').inTable('races').onDelete('CASCADE')
      table.string('favoriteRider').notNullable()
      table.integer('placementFavoriteRider').notNullable()
      table.string('bonusRider').notNullable()
      table.integer('placementBonusRider').notNullable()
      table.integer('bonus_id').unsigned().references('id').inTable('bonuses').nullable()
      table.date('prediction_date').notNullable()
      table.integer('points_earned').defaultTo(0)
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
