import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RaceResultsSchema extends BaseSchema {
  protected tableName = 'race_results'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('race_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('races')
        .onDelete('CASCADE')

      table.string('stage_number').nullable() // Étape ou null si GC

      table.string('rider_name').notNullable()
      table.string('rider_url').notNullable()
      table.string('team_name').notNullable()
      table.string('team_url').notNullable()
      table.string('nationality', 5).notNullable()
      table.integer('rank').notNullable()
      table.integer('prev_rank').nullable()
      table.integer('age').notNullable()
      table.integer('pcs_points').defaultTo(0)
      table.integer('uci_points').defaultTo(0)
      table.integer('rider_number').notNullable()
      table.string('time').notNullable()
      table.string('bonus_time').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

      // ✅ Empêche les doublons (un seul résultat par coureur et étape)
      table.unique(['race_id', 'rider_url', 'stage_number'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
