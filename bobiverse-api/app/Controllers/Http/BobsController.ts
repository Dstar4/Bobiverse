import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BobsController {
  public async index({ user }: HttpContextContract) {
    const bob = await user.related('bob').query()
    return { data: bob }
    // const drone = await bob.related('drone').query()
    // const drone = await Drone.query().where({ 'bob_id': bob[0].id })
    // return { user, bob, drone }
  }

  public async store({ }: HttpContextContract) {
  }

  public async show({ user, request }: HttpContextContract) {
    const bob = await user.related('bob').query().where({ id: request.params().id })
    return bob

  }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
