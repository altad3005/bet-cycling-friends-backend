import type { HttpContext } from '@adonisjs/core/http'
import { RaceService } from '#services/race_service'
import { inject } from '@adonisjs/core'

@inject()
export default class RacesController {
  constructor(private raceService: RaceService) {}

  async startList({ params, response }: HttpContext) {
    const raceSlug = params.slug
    const year = params.year
    const startlist = await this.raceService.getStartlist(raceSlug, year)
    return response.ok(startlist)
  }

  async results({ params, response }: HttpContext) {
    const raceSlug = params.slug
    const year = params.year
    const results = await this.raceService.getResultsGc(raceSlug, year)
    return response.ok(results)
  }
}
