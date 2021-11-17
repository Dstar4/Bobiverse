import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'

export default class UsersController {
  public async index(ctx: HttpContextContract) {}
  public async store({ request, response }: HttpContextContract) {
    const { email, password, nickname } = request.body()

    const searchCriteria = { email }
    const savePayload = { email, password, nickname }
    const user = await User.firstOrCreate(searchCriteria, savePayload)
    if (user.$isPersisted) {
      response.created({ data: user })
    } else {
      throw new Error(`Could not register user`)
    }
  }
  public async update(ctx: HttpContextContract) {}
  public async delete(ctx: HttpContextContract) {}
}
