import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserBonuses extends BaseSchema {
  protected tableName = 'user_bonuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('bonus_id').unsigned().references('id').inTable('bonuses').onDelete('CASCADE')
      table.date('attribution_date').notNullable()
      table.integer('bonus_points').defaultTo(0)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
