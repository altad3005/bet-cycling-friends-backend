import type { HttpContext } from '@adonisjs/core/http'
import { RaceService } from '#services/race_service'
import { inject } from '@adonisjs/core'

@inject()
export default class RacesController {
  constructor(private raceService: RaceService) {}

  async raceInfo({ params, response }: HttpContext) {
    const raceSlug = params.slug
    const year = params.year
    const raceInfo = await this.raceService.syncRaceInfos(raceSlug, year)
    return response.ok({ message: 'Race info retrieved successfully', data: raceInfo })
  }

  async startList({ params, response }: HttpContext) {
    const raceSlug = params.slug
    const year = params.year
    const startlist = await this.raceService.syncStartlist(raceSlug, year)
    return response.ok({ message: 'Startlist retrieved successfully', data: startlist })
  }
}
