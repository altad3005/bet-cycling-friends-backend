import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'predictions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('race_id').unsigned().references('id').inTable('races').onDelete('CASCADE')
      table.string('rider_name').notNullable()
      table
        .enu('bonus_type', [
          'flat_tire',
          'breakaway',
          'counter_pick',
          'captain',
          'swap',
          'substitute',
        ])
        .nullable()
      table.json('bonus_data').nullable()
      table.integer('points_earned').defaultTo(0)
      table.boolean('is_processed').defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
