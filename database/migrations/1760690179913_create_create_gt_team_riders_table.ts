import { BaseSchema } from '@adonisjs/lucid/schema'

export default class GTTeamRiders extends BaseSchema {
  protected tableName = 'gt_team_riders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('gt_team_id')
        .unsigned()
        .references('id')
        .inTable('gt_teams')
        .onDelete('CASCADE')
      table.string('rider_name').notNullable()
      table.float('rider_price').notNullable()
      table.string('role').nullable()
      table.integer('points_earned').defaultTo(0)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
