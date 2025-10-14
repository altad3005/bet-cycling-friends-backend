export interface CyclingApiAdapter {
  getResultsGc(slug: string, year?: string): Promise<any>
  getStartlist(slug: string, year?: string): Promise<any>
  getResultsStage(raceSlug: string, stageNumber: string, year: any): Promise<any>;
}
