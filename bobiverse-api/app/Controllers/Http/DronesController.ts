import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Bob from 'App/Models/Bob'
import Drone from 'App/Models/Drone'
import {DateTime} from 'luxon'
import {add} from 'date-fns'
import Mineral from 'App/Models/Mineral'
import isEqual from 'lodash.isequal'


export default class DronesController {
  public async index({user}: HttpContextContract) {
    const drones = await user
      .related('bobs')
      .query()
      .preload('drones', dronesQuery => {
        dronesQuery
      })
    return {data: drones}
  }

  public async store({request, response}: HttpContextContract) {
    const {bobId, drone} = request.body()
    const bob = await Bob.findOrFail(bobId)
    const newDrone = await bob.related('drones').create(drone)
    return response.created({data: newDrone})
  }

  public async show({params}: HttpContextContract) {
    return await Drone.findOrFail(params.id)
  }

  public async update({request, params}: HttpContextContract) {
    const drone = await Drone.findOrFail(params.id)
    return await drone.merge({...request.body()}).save()
  }

  public async destroy({params}: HttpContextContract) {
    const drone = await Drone.findOrFail(params.id)
    return await drone.delete()
  }

  public async mine({request, response}: HttpContextContract) {
    const {droneId, targetId} = request.body()

    const drone = await Drone.findOrFail(droneId)
    const bob = await Bob.findOrFail(drone.bobId)
    const target = await Mineral.findOrFail(targetId)
    if (
      bob.locationId !== target.locationId ||
      isEqual(bob.coordinates !== target.coordinates)
    ) {
      response.badRequest({message: 'Unable to mine a location thar far away'})
    }
    drone.targetId = target.id
    const time = add(new Date(Date.now()), {seconds: 10})
    drone.jobCompleteAt = DateTime.fromJSDate(time)

    return await drone.save()
  }
}
