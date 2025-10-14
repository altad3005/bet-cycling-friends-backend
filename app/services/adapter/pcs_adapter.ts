import axios from 'axios'
import { DateTime } from 'luxon'
import { CyclingApiAdapter } from '#services/adapter/adapter_interface'

export class PCSAdapter implements CyclingApiAdapter {
  private readonly baseUrl: string

  constructor(baseUrl = process.env.PCS_API_URL || 'http://127.0.0.1:8001') {
    this.baseUrl = baseUrl
  }

  async getResultsGc(slug: string, year: string = DateTime.now().year.toString()) {
    const res = await axios.get(`${this.baseUrl}/race/${slug}/${year}/gc`)
    return res.data
  }

  async getStartlist(slug: string, year: string = DateTime.now().year.toString()) {
    const res = await axios.get(`${this.baseUrl}/race/${slug}/${year}/startlist`)
    return res.data
  }
}
