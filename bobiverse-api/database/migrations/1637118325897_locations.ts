import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Locations extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.string('system')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })

    this.schema.alterTable('bobs', table => {
      table
        .integer('location_id')
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
      table.jsonb('coordinates')
    })

    this.schema.alterTable('minerals', table => {
      table
        .integer('location_id')
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
      table.jsonb('coordinates')
    })
  }

  public async down() {
    this.schema.alterTable('bobs', table => {
      table.dropColumn('location_id')
      table.dropColumn('coordinates')
    })
    this.schema.alterTable('minerals', table => {
      table.dropColumn('location_id')
      table.dropColumn('coordinates')
    })
    this.schema.dropTable(this.tableName)
  }
}
