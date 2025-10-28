import { CyclingApiAdapter } from '#services/adapter/adapter_interface'
import { PCSAdapter } from '#services/adapter/pcs_adapter'
import Race from '#models/race'
import RaceResult from '#models/race_result'
import RaceStage from '#models/race_stage'
import db from '@adonisjs/lucid/services/db'
import { RaceStageDto } from '../dto/race_stage_dto.js'
import { RaceInfoDto } from '../dto/race_info_dto.js'
import Startlist from '#models/startlist'

export class RaceService {
  private adapter: CyclingApiAdapter

  constructor(adapter: CyclingApiAdapter = new PCSAdapter()) {
    this.adapter = adapter
  }

  async syncResultsGc(slug: string, year?: number) {
    const race = await Race.findByOrFail('slug', slug)
    const dtos = await this.adapter.getResultsGc(slug, year)

    await db.transaction(async (trx) => {
      for (const dto of dtos) {
        await RaceResult.updateOrCreate(
          { raceId: race.id, riderUrl: dto.riderUrl },
          dto.toModel(race.id),
          { client: trx }
        )
      }
    })
  }

  async syncResultsStage(raceSlug: string, stageNumber: number, year?: number) {
    const race = await Race.findByOrFail('slug', raceSlug)
    const dtos = await this.adapter.getResultsStage(raceSlug, stageNumber, year)

    await db.transaction(async (trx) => {
      for (const dto of dtos) {
        await RaceResult.updateOrCreate(
          { raceId: race.id, riderUrl: dto.riderUrl, stageNumber },
          dto.toModel(race.id, stageNumber),
          { client: trx }
        )
      }
    })
  }

  async syncRaceInfos(slug: string, year?: number) {
    const raceJson = await this.adapter.getInfosRace(slug, year)
    const raceInfo = RaceInfoDto.fromApiResponse(raceJson)

    const race = await Race.updateOrCreate({ slug }, raceInfo.toModel())

    const stagesDto = RaceStageDto.fromApiResponse(raceInfo.stages)

    if (stagesDto.length > 0) {
      await db.transaction(async (trx) => {
        for (const [i, dto] of stagesDto.entries()) {
          await RaceStage.updateOrCreate(
            { raceId: race.id, stageNumber: i + 1 },
            dto.toModel(race.id, i + 1),
            { client: trx }
          )
        }
      })
    }
  }

  async syncStartlist(slug: string, year?: number) {
    const race = await Race.findByOrFail('slug', slug)
    const dtos = await this.adapter.getStartlist(slug, year)

    await db.transaction(async (trx) => {
      for (const dto of dtos) {
        await Startlist.updateOrCreate(
          { raceId: race.id, riderId: dto.riderNumber },
          dto.toModel(race.id),
          { client: trx }
        )
      }
    })
  }

  async getResultsGc(id: number) {
    return RaceResult.query().where('race_id', id).orderBy('rank')
  }

  async getResultsStage(id: number, stageNumber: string) {
    return RaceResult.query().where('race_id', id).where('stageNumber', stageNumber).orderBy('rank')
  }

  async getStartlist(raceId: number) {
    return Startlist.query().where('race_id', raceId)
  }
}
