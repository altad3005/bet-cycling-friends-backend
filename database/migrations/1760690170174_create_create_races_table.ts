import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Races extends BaseSchema {
  protected tableName = 'races'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('type').notNullable()
      table.integer('multiplicator').notNullable().defaultTo(1)
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.float('max_budget').notNullable()
      table.integer('season_id').unsigned().references('id').inTable('seasons').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
