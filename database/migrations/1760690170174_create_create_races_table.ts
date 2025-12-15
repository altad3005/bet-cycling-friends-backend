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
      table.date('start_date').nullable()
      table.date('end_date').nullable()
      table.integer('max_budget').notNullable()
      table.integer('season_id').unsigned().references('id').inTable('seasons').onDelete('CASCADE')
      table.string('category').nullable()
      table.integer('edition').nullable()
      table.string('nationality', 5).nullable()
      table.string('uci_tour').nullable()
      table.boolean('is_one_day_race').defaultTo(false)
      table.boolean('is_monument').defaultTo(false)
      table.integer('year').nullable()
      table.jsonb('prev_editions').nullable()
      table.jsonb('stages_winners').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
