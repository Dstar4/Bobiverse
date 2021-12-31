import {DateTime} from 'luxon'
import {viableRange} from '../../lib/movement'
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
import {Coordinates} from '../../types/global'
import isEqual from 'lodash.isequal'

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

  @column()
  public locationId: number

  @column()
  public coordinates: Coordinates | null

  @column()
  public deployed: boolean

  @belongsTo(() => Bob)
  public bob: BelongsTo<typeof Bob>

  @hasOne(() => Mineral)
  public mineral: HasOne<typeof Mineral>

  /* ----------------------------- Custom Methods ----------------------------- */
  public isCurrentlyWorking = () => (this.jobCompleteAt ? true : false)

  public isViableTarget(target: Mineral) {
    return (
      this.locationId === target.locationId &&
      isEqual(this.coordinates, target.coordinates)
    )
  }

  public isViableDestination(destination: Coordinates): boolean {
    if (!this.coordinates) return false
    if (
      viableRange(this.coordinates.x).includes(destination.x) &&
      viableRange(this.coordinates.y).includes(destination.y) &&
      viableRange(this.coordinates.z).includes(destination.z)
    ) {
      return true
    }
    return false
  }
}
