import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Bonuses extends BaseSchema {
  protected tableName = 'bonuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('type').notNullable()
      table.string('effect').notNullable()
      table.integer('season_limit').nullable()
      table.integer('race_limit').nullable()
      table.text('attribution_condition').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
