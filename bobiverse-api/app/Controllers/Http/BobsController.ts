import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Bob from 'App/Models/Bob'
import Drone from 'App/Models/Drone'
import Mineral from 'App/Models/Mineral'

export default class BobsController {
  public async index({user}: HttpContextContract) {
    const bobs = await Bob.loadRelated(user)
    return {
      bobs,
    }
  }

  public async store({request, response, user}: HttpContextContract) {
    const payload = request.body()
    const bob = await Bob.firstOrCreate(payload, payload)
    await user.related('bobs').save(bob)
    return response.created(bob)
  }

  public async show({user, request}: HttpContextContract) {
    const bob = await user
      .related('bobs')
      .query()
      .where({id: request.params().id})
      .firstOrFail()
    return {data: bob}
  }

  public async drones({user, request, response}: HttpContextContract) {
    // const bob = await user
    //   .related('bobs')
    //   .query()
    //   .where({id: request.params().id})
    //   .firstOrFail()
    // if (!bob) return response.badRequest()
    const drones = await Drone.query().where({bobId: request.params().id})
    return {data: drones}
  }

  public async update({params, request, response, user}: HttpContextContract) {
    let bob = await Bob.findOrFail(params.id)
    if (bob.userId !== user.id) return response.badRequest('Unauthorized')
    return await bob.merge({...request.body()}).save()
  }

  public async destroy({params}: HttpContextContract) {
    let bob = await Bob.findOrFail(params.id)
    return await bob.delete()
  }

  public async scan({params}: HttpContextContract) {
    let bob = await Bob.findOrFail(params.id)

    const mineralScan = Mineral.query().where('locationId', bob.locationId)
    const bobScan = Bob.query().where('locationId', bob.locationId)
    const droneScan = Drone.query().where('locationId', bob.locationId)

    let results = await Promise.all([mineralScan, bobScan, droneScan])

    return {
      data: {
        minerals: results[0],
        drones: results[2],
        bobs: results[1],
      },
    }
  }

  public async travel({params, request, response}: HttpContextContract) {
    const bob = await Bob.findOrFail(params.id)
    const {coordinates} = request.body()

    // Check if destination is viable
    if (!bob.isViableDestination(coordinates)) {
      return response.badRequest({
        message:
          'Unable to move to that location. You can only move 1 unit at a time.',
      })
    }

    // update bobs coordinates
    bob.coordinates = coordinates
    await bob.save()

    return await Bob.findOrFail(params.id)
  }
}
