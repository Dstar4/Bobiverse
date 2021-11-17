/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth/login', 'AuthController.login')
Route.post('/users/register', 'UsersController.store')

Route.group(() => {
  Route.resource('bobs', 'BobsController').apiOnly()
  Route.get('bobs/:id/scan', 'BobsController.scan').middleware('throttle:1,30000')
  Route.resource('drones', 'DronesController').apiOnly()
  Route.post('drones/mine', 'DronesController.mine')
})
  .middleware('auth')
  .middleware('updateAction')

Route.get('/', async () => {
  return { hello: 'world' }
})
