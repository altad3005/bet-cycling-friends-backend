import { ScraperStartlist } from '../interfaces/scraper-startlist.interface';
import { PcsStartlistService } from '../pcs-startlist.service';

describe('ScraperService', () => {
  let service: ScraperStartlist;

  beforeAll(() => {
    service = new PcsStartlistService();
  });

  it('should return a list of riders', async () => {
    const riders = await service.getStartList('tour-de-france/2025');
    console.log(riders);
    expect(riders).toBeInstanceOf(Array);
  });
});
