import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Bob from './Bob'

export default class Drone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public size: string

  @column()
  public bobId: number

  @belongsTo(() => Bob)
  public bob: BelongsTo<typeof Bob>
}
