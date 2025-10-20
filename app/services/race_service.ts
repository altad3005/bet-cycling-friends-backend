import { CyclingApiAdapter } from '#services/adapter/adapter_interface'
import { PCSAdapter } from '#services/adapter/pcs_adapter'
import Race from '#models/race'
import RaceResult from '#models/race_result'
import db from '@adonisjs/lucid/services/db'
import { GcResultDto } from '../dto/gc_result_dto.js'

export class RaceService {
  private adapter: CyclingApiAdapter

  constructor(adapter: CyclingApiAdapter = new PCSAdapter()) {
    this.adapter = adapter
  }

  /**
   * Récupère les résultats GC depuis l'API PCS
   */
  async fetchResultsGc(slug: string, year?: number): Promise<GcResultDto[]> {
    return await this.adapter.getResultsGc(slug, year)
  }

  /**
   * Sauvegarde les résultats GC en base (et renvoie ceux enregistrés)
   */
  async saveResultsGc(slug: string, year?: number) {
    const race = await Race.findByOrFail('slug', slug)
    const dtos = await this.fetchResultsGc(slug, year)

    await db.transaction(async (trx) => {
      for (const dto of dtos) {
        await RaceResult.updateOrCreate(
          { raceId: race.id, riderUrl: dto.riderUrl },
          dto.toModel(race.id),
          { client: trx }
        )
      }
    })
  }

  async saveResultsStage(raceSlug: string, stageNumber: string, year?: number) {
    const race = await Race.findByOrFail('slug', raceSlug)
    const dtos = await this.fetchResultsStage(raceSlug, stageNumber, year)

    await db.transaction(async (trx) => {
      for (const dto of dtos) {
        await RaceResult.updateOrCreate(
          { raceId: race.id, riderUrl: dto.riderUrl, stageNumber },
          dto.toModel(race.id, stageNumber),
          { client: trx }
        )
      }
    })
  }

  /**
   * Récupère la startlist (pas encore persistée)
   */
  async fetchStartlist(slug: string, year?: number) {
    return await this.adapter.getStartlist(slug, year)
  }

  /**
   * Récupère les résultats d'étape (non sauvegardés)
   */
  async fetchResultsStage(raceSlug: string, stageNumber: string, year?: number) {
    return await this.adapter.getResultsStage(raceSlug, stageNumber, year)
  }
}
