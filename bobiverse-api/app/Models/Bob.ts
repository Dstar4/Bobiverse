import {DateTime} from 'luxon'
import {
  belongsTo,
  BelongsTo,
  BaseModel,
  column,
  scope,
  hasMany,
  HasMany,
  HasOne,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeFind,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import User from './user'
import Drone from './Drone'
import {Coordinates} from '../../types/global'
import Location from './Location'
export default class Bob extends BaseModel {
  /* -------------------------------------------------------------------------- */
  /*                                   Schema                                   */
  /* -------------------------------------------------------------------------- */
  @column({isPrimary: true})
  public id: number

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
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

  /* -------------------------------------------------------------------------- */
  /*                                Relationships                               */
  /* -------------------------------------------------------------------------- */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>

  @hasMany(() => Drone)
  public drones: HasMany<typeof Drone>

  /* -------------------------------------------------------------------------- */
  /*                                  Lifecycle                                 */
  /* -------------------------------------------------------------------------- */
  @beforeFind()
  public static joinSingleConnected(
    query: ModelQueryBuilderContract<typeof Bob>
  ) {
    query.withScopes(scopes => scopes.joinRelated())
  }

  @beforeFetch()
  public static joinManyConnected(
    query: ModelQueryBuilderContract<typeof Bob>
  ) {
    query.withScopes(scopes => scopes.joinRelated())
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Scopes                                   */
  /* -------------------------------------------------------------------------- */
  public static joinRelated = scope(
    (query: ModelQueryBuilderContract<typeof Bob>) => {
      query.preload('location').preload('drones')
    }
  )

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  public static async loadRelated(user: User) {
    return await this.query().where({user_id: user.id})
  }
}
