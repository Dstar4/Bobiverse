import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Drones extends BaseSchema {
  protected tableName = 'drones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('bob_id').references('id').inTable('bobs')
      table.string('size', 255)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
