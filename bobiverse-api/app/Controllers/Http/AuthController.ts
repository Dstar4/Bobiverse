import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({auth, request, response}: HttpContextContract) {
    const {email, password} = request.body()
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
