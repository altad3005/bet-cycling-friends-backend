import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PredictionBonuses extends BaseSchema {
  protected tableName = 'prediction_bonuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('prediction_id')
        .unsigned()
        .references('id')
        .inTable('predictions')
        .onDelete('CASCADE')
      table.integer('bonus_id').unsigned().references('id').inTable('bonuses').onDelete('CASCADE')
      table
        .integer('target_user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.date('application_date').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
