import axios from 'axios'
import { DateTime } from 'luxon'
import { CyclingApiAdapter } from '#services/adapter/adapter_interface'
import { RaceResultDto } from '../../dto/race_result_dto.js'

export class PCSAdapter implements CyclingApiAdapter {
  private readonly baseUrl: string

  constructor(baseUrl = process.env.PCS_API_URL || 'http://127.0.0.1:8001') {
    this.baseUrl = baseUrl
  }

  async getResultsGc(slug: string, year: number = DateTime.now().year): Promise<RaceResultDto[]> {
    const res = await axios.get(`${this.baseUrl}/race/${slug}/${year}/gc`)
    const json = res.data
    return RaceResultDto.fromApiResponse(json)
  }

  async getStartlist(slug: string, year: number = DateTime.now().year): Promise<any> {
    const res = await axios.get(`${this.baseUrl}/race/${slug}/${year}/startlist`)
    return res.data
  }

  async getResultsStage(
    raceSlug: string,
    stageNumber: string,
    year: number = DateTime.now().year
  ): Promise<RaceResultDto[]> {
    const res = await axios.get(`${this.baseUrl}/race/${year}/${raceSlug}/stage/${stageNumber}`)
    const json = res.data
    return RaceResultDto.fromApiResponse(json)
  }
}
