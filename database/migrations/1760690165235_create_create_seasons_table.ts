import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Seasons extends BaseSchema {
  protected tableName = 'seasons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('year').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
