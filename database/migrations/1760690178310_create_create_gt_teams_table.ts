import { BaseSchema } from '@adonisjs/lucid/schema'

export default class GTTeams extends BaseSchema {
  protected tableName = 'gt_teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('points_earned').defaultTo(0)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('race_id').unsigned().references('id').inTable('races').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
