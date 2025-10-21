import { DateTime } from 'luxon'

export interface StartlistApiResponse {
  rider_name: string
  rider_url: string
  nationality: string
  rider_number: number
  team_name: string
  team_url: string
}

export class StartlistDto {
  riderName: string
  riderUrl: string
  nationality: string
  riderNumber: number
  teamName: string
  teamUrl: string

  constructor(data: StartlistApiResponse) {
    this.riderName = data.rider_name
    this.riderUrl = data.rider_url
    this.nationality = data.nationality
    this.riderNumber = data.rider_number
    this.teamName = data.team_name
    this.teamUrl = data.team_url
  }

  static fromApiResponse(apiResponse: StartlistApiResponse[]): StartlistDto[] {
    return apiResponse.map((r) => new StartlistDto(r))
  }

  toModel(raceId: number) {
    return {
      race_id: raceId,
      rider_name: this.riderName,
      team_name: this.teamName,
      country: this.nationality,
      rider_id: this.riderNumber,
      updated_at: DateTime.now(),
    }
  }
}
