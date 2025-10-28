import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Predictions extends BaseSchema {
  protected tableName = 'predictions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('race_id').unsigned().references('id').inTable('races').onDelete('CASCADE')
      table.string('favorite_rider_name').notNullable()
      table.integer('placement_favorite_rider').notNullable()
      table.string('bonus_rider_name').notNullable()
      table.integer('placement_bonus_rider').notNullable()
      table
        .integer('bonus_id')
        .unsigned()
        .references('id')
        .inTable('bonuses')
        .onDelete('SET NULL')
        .nullable()
      table.dateTime('prediction_date').notNullable()
      table.integer('points_earned').defaultTo(0)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
