import { GcResultDto } from '../../dto/result/gc_result_dto.js'
import { StageResultDto } from '../../dto/result/stage_result_dto.js'
import { RaceInfoDto } from '../../dto/race_info_dto.js'
import { StartlistDto } from '../../dto/startlist_dto.js'

export interface CyclingApiAdapter {
  getResultsGc(slug: string, year?: number): Promise<GcResultDto[]>
  getStartlist(slug: string, year?: number): Promise<StartlistDto[]>
  getResultsStage(raceSlug: string, stageNumber: number, year?: number): Promise<StageResultDto[]>
  getInfosRace(slug: string, year?: number): Promise<RaceInfoDto>
}
