import { Injectable } from '@nestjs/common';
import { ScraperStartlist } from '../scraper/interfaces/scraper-startlist.interface';

@Injectable()
export class RacesService {
  constructor(private readonly startlistScraperService: ScraperStartlist) {}

  getStartlist(id: string) {
    return this.startlistScraperService.getStartList(id, '2025'); // TODO: Ajouter la saison au course pour la récupérer dynamiquement
  }
}
