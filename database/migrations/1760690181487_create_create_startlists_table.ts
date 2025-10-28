import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Startlists extends BaseSchema {
  protected tableName = 'startlists'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('race_id').unsigned().references('id').inTable('races').onDelete('CASCADE')
      table.integer('rider_id').nullable()
      table.string('rider_name').nullable()
      table.string('team_name').nullable()
      table.integer('uci_rank').nullable()
      table.string('country').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
