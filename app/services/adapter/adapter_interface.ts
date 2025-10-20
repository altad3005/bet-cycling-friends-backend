import { RaceResultDto } from '../../dto/race_result_dto.js'

export interface CyclingApiAdapter {
  getResultsGc(slug: string, year?: number): Promise<RaceResultDto[]>
  getStartlist(slug: string, year?: number): Promise<any>
  getResultsStage(raceSlug: string, stageNumber: string, year?: number): Promise<RaceResultDto[]>
}
