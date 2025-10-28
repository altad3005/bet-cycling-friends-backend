import { DateTime } from 'luxon'

export interface RaceInfo {
  category: string
  edition: number
  enddate: string
  is_one_day_race: boolean
  name: string
  nationality: string
  prev_editions_select: any[]
  stages: any[]
  stages_winners: any[]
  startdate: string
  uci_tour: string
  year: number
}

export class RaceInfoDto {
  category: string
  edition: number
  endDate: string
  isOneDayRace: boolean
  name: string
  nationality: string
  prevEditions: any[]
  stages: any[]
  stagesWinners: any[]
  startDate: string
  uciTour: string
  year: number

  constructor(data: any) {
    this.category = data.category
    this.edition = data.edition
    this.endDate = data.enddate ?? data.endDate
    this.isOneDayRace = data.is_one_day_race ?? data.isOneDayRace
    this.name = data.name
    this.nationality = data.nationality
    this.prevEditions = data.prev_editions_select ?? data.prevEditions
    this.stages = data.stages
    this.stagesWinners = data.stages_winners ?? data.stagesWinners
    this.startDate = data.startdate ?? data.startDate
    this.uciTour = data.uci_tour ?? data.uciTour
    this.year = data.year
  }

  toModel() {
    return {
      name: this.name,
      category: this.category,
      edition: this.edition,
      nationality: this.nationality,
      uciTour: this.uciTour,
      isOneDayRace: this.isOneDayRace,
      year: this.year,
      startDate: this.startDate ? DateTime.fromISO(this.startDate) : null,
      endDate: this.endDate ? DateTime.fromISO(this.endDate) : null,
      type: this.isOneDayRace ? 'one-day' : 'stage',
      maxBudget: 0,
      multiplicator: 1,
      prevEditions: JSON.stringify(this.prevEditions ?? []),
      stagesWinners: JSON.stringify(this.stagesWinners ?? []),
    }
  }

  static fromApiResponse(apiResponse: any): RaceInfoDto {
    return new RaceInfoDto(apiResponse)
  }
}
