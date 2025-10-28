import { DateTime } from 'luxon'

export interface RaceStageInfo {
  stage_name: string
  stage_url: string
  profile_icon: string
  date: string
}

export class RaceStageDto {
  stageName: string
  stageUrl: string
  profileIcon: string
  date: string

  constructor(data: RaceStageInfo) {
    this.stageName = data.stage_name
    this.stageUrl = data.stage_url
    this.profileIcon = data.profile_icon
    this.date = data.date
  }

  toModel(raceId: number, stageNumber: number) {
    return {
      raceId,
      stageNumber,
      stageName: this.stageName,
      stageUrl: this.stageUrl,
      profileIcon: this.profileIcon,
      date: this.date ? DateTime.fromISO(this.date) : null,
    }
  }

  static fromApiResponse(apiResponse: any[]): RaceStageDto[] {
    return apiResponse.map((s) => new RaceStageDto(s))
  }
}
