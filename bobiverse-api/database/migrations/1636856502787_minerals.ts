import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Minerals extends BaseSchema {
  protected tableName = 'minerals'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('payload')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })

    this.schema.alterTable('drones', table => {
      table
        .integer('target_id')
        .references('id')
        .inTable('minerals')
        .onDelete('CASCADE')
    })
    this.schema.alterTable('bobs', table => {
      table.integer('minerals')
    })
  }

  public async down() {
    this.schema.alterTable('drones', table => {
      table.dropColumn('target_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
