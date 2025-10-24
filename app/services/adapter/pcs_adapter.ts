import { DateTime } from 'luxon'
import { CyclingApiAdapter } from '#services/adapter/adapter_interface'
import { GcResultDto } from '../../dto/result/gc_result_dto.js'
import { StageResultDto } from '../../dto/result/stage_result_dto.js'
import { RaceInfoDto } from '../../dto/race_info_dto.js'
import { StartlistDto } from '../../dto/startlist_dto.js'
import { api } from '#services/adapter/api_instance'

export class PCSAdapter implements CyclingApiAdapter {
  async getResultsGc(slug: string, year = DateTime.now().year) {
    const res = await api.get(`/race/${slug}/${year}/gc`)
    return GcResultDto.fromApiResponse(res.data)
  }

  async getStartlist(slug: string, year = DateTime.now().year) {
    const res = await api.get(`/race/${slug}/${year}/startlist`)
    return StartlistDto.fromApiResponse(res.data)
  }

  async getResultsStage(raceSlug: string, stageNumber: string, year = DateTime.now().year) {
    const res = await api.get(`/race/${raceSlug}/${year}/stage/${stageNumber}`)
    return StageResultDto.fromApiResponse(res.data)
  }

  async getInfosRace(slug: string, year = DateTime.now().year) {
    try {
      const res = await api.get(`/race/${slug}/${year}`)
      return RaceInfoDto.fromApiResponse(res.data)
    } catch (error) {
      console.error(`❌ Erreur PCSAdapter.getInfosRace(${slug}, ${year}):`, error.message)
      throw new Error(`Impossible de récupérer les infos de la course ${slug} ${year}`)
    }
  }
}
