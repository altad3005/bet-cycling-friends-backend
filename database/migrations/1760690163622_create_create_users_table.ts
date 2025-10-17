import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('pseudo').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('avatar_url').nullable()
      table.text('notification_preferences').nullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
