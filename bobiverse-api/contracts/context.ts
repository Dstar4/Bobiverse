declare module '@ioc:Adonis/Core/HttpContext' {
  import User from 'App/Models/user'

  interface HttpContextContract {
    user: User
  }
}
