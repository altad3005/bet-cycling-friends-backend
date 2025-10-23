import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RaceStages extends BaseSchema {
  protected tableName = 'race_stages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('race_id')
        .unsigned()
        .references('id')
        .inTable('races')
        .onDelete('CASCADE')

      table.integer('stage_number').nullable()
      table.string('stage_name').notNullable()
      table.string('stage_url').nullable()
      table.string('profile_icon').nullable()
      table.string('date').nullable()

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
