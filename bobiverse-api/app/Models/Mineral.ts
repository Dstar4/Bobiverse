import { DateTime } from 'luxon'
import { beforeDelete, BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Drone from './Drone'
import { Coordinates } from '../../types/global'

export default class Mineral extends BaseModel {
  @beforeDelete()
  public static async regenerate() {
    await this.create({
      payload: Math.floor(Math.random() * 1000),
    })
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public payload: number

  @column()
  public locationId: number

  @column()
  public coordinates: Coordinates

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Drone)
  public drone: BelongsTo<typeof Drone>
}
