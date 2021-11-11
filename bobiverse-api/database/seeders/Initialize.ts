import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import Bob from 'App/Models/Bob'
import User from 'App/Models/User'

export default class InitializeSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const user = await User.create({
      email: "example@test.com",
      password: "test",
      nickname: "example"
    })

    const bob = await user.related('bob').create({
      name: 'Bob'
    })

    const drones = await bob.related('drone').createMany([
      { size: 'md' },
      { size: 'md' },
    ])
    console.log({ user, bob, drones })
  }
}
