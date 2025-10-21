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

  constructor(data: RaceInfo) {
    this.category = data.category
    this.edition = data.edition
    this.endDate = data.enddate
    this.isOneDayRace = data.is_one_day_race
    this.name = data.name
    this.nationality = data.nationality
    this.prevEditions = data.prev_editions_select
    this.stages = data.stages
    this.stagesWinners = data.stages_winners
    this.startDate = data.startdate
    this.uciTour = data.uci_tour
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
      startDate: this.startDate,
      endDate: this.endDate,
      prevEditions: this.prevEditions,
      stagesWinners: this.stagesWinners,
    }
  }

  static fromApiResponse(apiResponse: any): RaceInfoDto {
    return new RaceInfoDto(apiResponse)
  }
}
