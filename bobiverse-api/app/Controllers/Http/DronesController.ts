import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import add from 'date-fns/add'
import {droneMiningTime} from '../../../lib/constants'
import {DateTime} from 'luxon'

import Bob from 'App/Models/Bob'
import Drone from 'App/Models/Drone'
import Mineral from 'App/Models/Mineral'

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

    // Load all models
    const drone = await Drone.findOrFail(droneId)
    const target = await Mineral.findOrFail(targetId)

    // Check if drone is already mining
    if (drone.isCurrentlyWorking) {
      return response.badRequest({
        message: 'Complete current job before starting another one',
      })
    }
    // Check for valid target
    if (!drone.isViableTarget(target)) {
      return response.badRequest({
        message: 'Unable to mine a location thar far away',
      })
    }

    if (!drone.deployed) drone.deployed = true
    // Set drone to mine target
    drone.targetId = target.id
    const time = add(new Date(Date.now()), droneMiningTime)
    drone.jobCompleteAt = DateTime.fromJSDate(time)

    return await drone.save()
  }

  public async travel({params, request, response}: HttpContextContract) {
    let drone = await Drone.findOrFail(params.id)
    const {coordinates} = request.body()

    if (!drone.deployed) {
      const bob = await drone.related('bob').query().first()
      if (!bob) return response.badRequest()
      drone.deployed = true
      drone.coordinates = bob.coordinates
    }

    if (!drone.isViableDestination(coordinates)) {
      return response.badRequest({
        message: 'You can only travel 1 unit 1 away in each axis.',
      })
    }

    drone.coordinates = coordinates
    return await drone.save()
  }

  public async recall({params, response}: HttpContextContract) {
    const drone = await Drone.findOrFail(params.id)
    const bob = await drone.related('bob').query().first()
    if (!bob) return response.badRequest()

    if (!drone.coordinates) {
      return response.badRequest({
        message: 'Unable to recall a drone that is not deployed',
      })
    }

    if (!drone.isViableDestination(bob.coordinates)) {
      return response.badRequest({
        message: 'You can only recall from 1 unit 1 away in each axis.',
      })
    }

    drone.coordinates = null
    drone.deployed = false

    return await drone.save()
  }
}
