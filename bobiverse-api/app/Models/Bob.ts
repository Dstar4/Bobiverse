import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './user'
import Drone from './Drone'

export default class Bob extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Drone)
  public drone: HasMany<typeof Drone>
}
