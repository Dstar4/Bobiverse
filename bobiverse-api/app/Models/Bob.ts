import { DateTime } from 'luxon'
import {
  belongsTo,
  BelongsTo,
  BaseModel,
  column,
  scope,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './user'
import Drone from './Drone'
import { Coordinates } from '../../types/global'
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

  @column()
  public minerals: number

  @column()
  public locationId: number

  @column()
  public coordinates: Coordinates

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Drone)
  public drones: HasMany<typeof Drone>

  public static async loadRelated(user) {
    return await this.query()
      .where({ user_id: user.id })
      .preload('drones', (dronesQuery) => dronesQuery)
    // .firstOrFail()
  }
}
