import { CyclingApiAdapter } from '#services/adapter/adapter_interface'
import { PCSAdapter } from '#services/adapter/pcs_adapter'

export class RaceService {
  private adapter: CyclingApiAdapter

  constructor(adapter: CyclingApiAdapter = new PCSAdapter()) {
    this.adapter = adapter
  }

  async getResultsGc(slug: string, year?: string) {
    return this.adapter.getResultsGc(slug, year)
  }

  async getStartlist(slug: string, year?: string) {
    return this.adapter.getStartlist(slug, year)
  }

  async getResultsStage(raceSlug: string, stageNumber: string, year?: any) {
    return this.adapter.getResultsStage(raceSlug, stageNumber, year)
  }
}
