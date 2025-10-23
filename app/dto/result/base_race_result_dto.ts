export interface BaseRaceResult {
  rider_name: string
  rider_url: string
  rider_number: number
  team_name: string
  team_url: string
  rank: number
  age: number
  nationality: string
  time: string
  bonus: string | null
  pcs_points: number
  uci_points: number
}

export class BaseRaceResultDto {
  riderName: string
  riderUrl: string
  riderNumber: number
  teamName: string
  teamUrl: string
  rank: number
  age: number
  nationality: string
  time: string
  bonus: string | null
  pcsPoints: number
  uciPoints: number

  constructor(data: BaseRaceResult) {
    this.riderName = data.rider_name
    this.riderUrl = data.rider_url
    this.riderNumber = data.rider_number
    this.teamName = data.team_name
    this.teamUrl = data.team_url
    this.rank = data.rank
    this.age = data.age
    this.nationality = data.nationality
    this.time = data.time
    this.bonus = data.bonus
    this.pcsPoints = data.pcs_points
    this.uciPoints = data.uci_points
  }

  toModel(raceId: number, stageNumber?: string) {
    return {
      raceId,
      stageNumber: stageNumber ?? null, // utile pour étapes
      riderName: this.riderName,
      riderUrl: this.riderUrl,
      riderNumber: this.riderNumber,
      teamName: this.teamName,
      teamUrl: this.teamUrl,
      nationality: this.nationality,
      rank: this.rank,
      age: this.age,
      pcsPoints: this.pcsPoints,
      uciPoints: this.uciPoints,
      time: this.time,
      bonusTime: this.bonus,
    }
  }
}
