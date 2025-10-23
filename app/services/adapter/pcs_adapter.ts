import axios from 'axios'
import { DateTime } from 'luxon'
import { CyclingApiAdapter } from '#services/adapter/adapter_interface'
import { GcResultDto } from '../../dto/result/gc_result_dto.js'
import { StageResultDto } from '../../dto/result/stage_result_dto.js'
import { RaceInfoDto } from '../../dto/race_info_dto.js'
import { StartlistDto } from '../../dto/startlist_dto.js'

export class PCSAdapter implements CyclingApiAdapter {
  private readonly baseUrl: string

  constructor(baseUrl = process.env.PCS_API_URL || 'http://127.0.0.1:8001') {
    this.baseUrl = baseUrl
  }

  async getResultsGc(slug: string, year: number = DateTime.now().year): Promise<GcResultDto[]> {
    const res = await axios.get(`${this.baseUrl}/race/${slug}/${year}/gc`)
    const json = res.data
    return GcResultDto.fromApiResponse(json)
  }

  async getStartlist(slug: string, year: number = DateTime.now().year): Promise<StartlistDto[]> {
    const res = await axios.get(`${this.baseUrl}/race/${slug}/${year}/startlist`)
    return StartlistDto.fromApiResponse(res.data)
  }

  async getResultsStage(
    raceSlug: string,
    stageNumber: string,
    year: number = DateTime.now().year
  ): Promise<StageResultDto[]> {
    const res = await axios.get(`${this.baseUrl}/race/${year}/${raceSlug}/stage/${stageNumber}`)
    const json = res.data
    return StageResultDto.fromApiResponse(json)
  }

  async getInfosRace(slug: string, year: number = DateTime.now().year): Promise<RaceInfoDto> {
    const url = `${this.baseUrl}/race/${slug}/${year}`
    try {
      const res = await axios.get(url)
      return RaceInfoDto.fromApiResponse(res.data)
    } catch (error: any) {
      console.error(`❌ Erreur PCSAdapter.getInfosRace(${slug}, ${year}):`, error.message)
      throw new Error(`Impossible de récupérer les infos de la course ${slug} ${year}`)
    }
  }
}
