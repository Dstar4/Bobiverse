import {DateTime} from 'luxon'
import {
  hasOne,
  HasOne,
  belongsTo,
  BelongsTo,
  BaseModel,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import Bob from './Bob'
import Mineral from './Mineral'

export default class Drone extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @column()
  public size: string

  @column()
  public bobId: number

  @column()
  public targetId: number | null

  @column()
  public jobCompleteAt: DateTime | null

  @belongsTo(() => Bob)
  public bob: BelongsTo<typeof Bob>

  @hasOne(() => Mineral)
  public mineral: HasOne<typeof Mineral>
}
