import { BaseSchema } from '@adonisjs/lucid/schema'

export default class LeagueMembers extends BaseSchema {
  protected tableName = 'league_members'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('league_id').unsigned().references('id').inTable('leagues').onDelete('CASCADE')
      table.string('role').notNullable()
      table.dateTime('joined_at').defaultTo(this.now())
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
