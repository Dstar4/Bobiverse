import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Mineral from 'App/Models/Mineral'
import Location from 'App/Models/Location'
import {generateRandom} from 'lib/generateRandom'
const client = Database.connection()



export default class InitializeSeeder extends BaseSeeder {
  public async run() {
    await client.truncate('users', true)
    await client.truncate('bobs', true)
    await client.truncate('minerals', true)
    await client.truncate('locations', true)
    await client.truncate('drones', true)

    const locations = await Location.createMany([
      {
        system: 'Sol',
      },
      {
        system: 'Epsilon Eridani',
      },
      {
        system: 'Delta Pavonis',
      },
    ])

    await Promise.all(
      locations.map(async location => {
        let promises: Mineral[] = []
        for (let i = 0; i < 10; i++) {
          let loc = await Mineral.create({
            payload: Math.floor(Math.random() * 1000),
            locationId: location.id,
            coordinates: {
              x: generateRandom(),
              y: generateRandom(),
              z: generateRandom(),
            },
          })
          promises.push(loc)
        }
        return promises
      })
    )

    // Write your database queries inside the run method
    const user = await User.create({
      email: 'example@test.com',
      password: 'test',
      nickname: 'example',
    })

    const bob = await user.related('bobs').create({
      name: 'Bob',
      locationId: locations[0].id,
      coordinates: {
        x: generateRandom(),
        y: generateRandom(),
        z: generateRandom(),
      },
    })

    await bob.related('drones').createMany([{size: 'md'}, {size: 'md'}])
  }
}
