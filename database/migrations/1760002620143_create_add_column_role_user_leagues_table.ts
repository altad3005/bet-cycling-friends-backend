import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_leagues'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role').notNullable().defaultTo('member')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
  }
}
