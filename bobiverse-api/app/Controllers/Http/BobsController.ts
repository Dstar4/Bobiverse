import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Bob from 'App/Models/Bob'
import Mineral from 'App/Models/Mineral'
export default class BobsController {
  public async index({user}: HttpContextContract) {
    const bobs = await Bob.loadRelated(user)
    return {
      data: bobs,
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
    let results = await Mineral.query().where('locationId', bob.locationId)
    return {data: results}
  }
}
