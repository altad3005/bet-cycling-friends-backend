import { Rider } from '../domain/rider';

export abstract class ScraperStartlist {
  abstract getStartList(raceId: string, year: string): Promise<Rider[]>;
}
