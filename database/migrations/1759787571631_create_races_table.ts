import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'races'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').nullable()
      table.enu('type', ['one_day', 'stage', 'grand_tour']).notNullable()
      table.enu('status', ['upcoming', 'ongoing', 'finished']).notNullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').nullable()
      table.timestamp('prediction_deadline').notNullable()
      table.json('startlist').nullable()
      table.json('results').nullable()
      table.json('profile').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
