export interface CyclingApiAdapter {
  getResultsGc(slug: string, year?: string): Promise<any>
  getStartlist(slug: string, year?: string): Promise<any>
}
