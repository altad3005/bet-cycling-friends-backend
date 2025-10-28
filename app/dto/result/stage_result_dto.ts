import { BaseRaceResultDto, BaseRaceResult } from './base_race_result_dto.js'

export interface StageResult extends BaseRaceResult {
  status: string
  breakaway_kms: number
}

export class StageResultDto extends BaseRaceResultDto {
  status: string
  breakawayKms: number

  constructor(data: StageResult) {
    super(data)
    this.status = data.status
    this.breakawayKms = data.breakaway_kms
  }

  static fromApiResponse(apiResponse: any[]): StageResultDto[] {
    return apiResponse.map((r) => new StageResultDto(r))
  }

  override toModel(raceId: number, stageNumber?: number) {
    return {
      ...super.toModel(raceId, stageNumber),
      status: this.status,
      breakawayKms: this.breakawayKms,
    }
  }
}
