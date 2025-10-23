import { BaseRaceResultDto, BaseRaceResult } from './base_race_result_dto.js'

export interface GcResult extends BaseRaceResult {
  prev_rank: number
}

export class GcResultDto extends BaseRaceResultDto {
  prevRank: number

  constructor(data: GcResult) {
    super(data)
    this.prevRank = data.prev_rank
  }

  static fromApiResponse(apiResponse: any[]): GcResultDto[] {
    return apiResponse.map((r) => new GcResultDto(r))
  }

  override toModel(raceId: number) {
    return {
      ...super.toModel(raceId),
      prevRank: this.prevRank,
    }
  }
}
