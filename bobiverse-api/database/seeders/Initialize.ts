import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Mineral from 'App/Models/Mineral'
import Location from 'App/Models/Location'
import {Coordinates} from '../../types/global'
import {defaultCoordinates, randomCoordinates} from '../../lib/coordinates'

const client = Database.connection()

async function seedMineral(
  location: Location,
  coordinates: Coordinates = randomCoordinates()
): Promise<Mineral> {
  return await Mineral.create({
    payload: Math.floor(Math.random() * 1000),
    locationId: location.id,
    coordinates: coordinates,
  })
}
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
        await seedMineral(location, defaultCoordinates)
        await seedMineral(location, defaultCoordinates)
        for (let i = 0; i < 100; i++) {
          promises.push(await seedMineral(location))
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

    const bobs = await user.related('bobs').createMany([
      {
        name: 'Bob',
        locationId: locations[0].id,
        coordinates: defaultCoordinates,
      },
      {
        name: 'Riker',
        locationId: locations[1].id,
        coordinates: randomCoordinates(),
      },
      {
        name: 'Mario',
        locationId: locations[2].id,
        coordinates: randomCoordinates(),
      },
      {
        name: 'Bill',
        locationId: locations[0].id,
        coordinates: randomCoordinates(),
      },
    ])
    await Promise.all(
      bobs.map(async bob => {
        return bob.related('drones').createMany([
          {
            size: 'md',
            locationId: bob.locationId,
            coordinates: randomCoordinates(),
            deployed: true,
          },
          {
            size: 'md',
            locationId: bob.locationId,
            coordinates: randomCoordinates(),
            deployed: true,
          },
        ])
      })
    )
  }
}
