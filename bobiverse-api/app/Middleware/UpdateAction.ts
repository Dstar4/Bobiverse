import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import isBefore from 'date-fns/isBefore'

import Bob from 'App/Models/Bob'
import Mineral from 'App/Models/Mineral'

export default class UpdateAction {
  public async handle({user}: HttpContextContract, next: () => Promise<void>) {
    const bobs = await Bob.loadRelated(user)
    const drones = bobs
      .map(bob => {
        return bob.drones.map(drone => {
          return drone
        })
      })
      .flat()

    await Promise.all(
      drones.map(async drone => {
        const d = drone.serialize()
        const time = new Date(Date.now())
        const completeAt = d.job_complete_at

        if (isBefore(completeAt, time)) {
          const mineral = await Mineral.findOrFail(drone.targetId)
          const bob = await Bob.findOrFail(drone.bobId)

          drone.jobCompleteAt = null
          drone.targetId = null

          bob.minerals = bob.minerals + mineral.payload
          await bob.save()
          await drone.save()
          await mineral.delete()
        }
      })
    )
    await next()
  }
}
