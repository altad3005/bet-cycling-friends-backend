import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_leagues'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('league_id').unsigned().references('id').inTable('leagues').onDelete('CASCADE')
      table.integer('total_points').defaultTo(0)
      table.integer('exact_wins').defaultTo(0)
      table.integer('podiums').defaultTo(0)
      table.integer('longest_streak').defaultTo(0)
      table.timestamp('joined_at').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
