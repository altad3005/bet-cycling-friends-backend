import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Leagues extends BaseSchema {
  protected tableName = 'leagues'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('invite_code').notNullable().unique()
      table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('season_id').unsigned().references('id').inTable('seasons').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
