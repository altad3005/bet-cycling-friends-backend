import { ScraperRaceResult } from '../interfaces/scraper-race-result.interface';
import { PcsRaceResultService } from '../pcs_provider/pcs-race-result.service';

describe('PcsResultsService', () => {
  let service: ScraperRaceResult;

  beforeAll(() => {
    service = new PcsRaceResultService();
  });

  it('should return the top 10 riders', async () => {
    //const top10 = await service.getTop10('tour-de-france/2025', 'stage-21');
    const top10 = await service.getTop10('tour-de-pologne/2025', true);
    console.log(top10);

    expect(top10).toBeInstanceOf(Array);
    expect(top10.length).toBeLessThanOrEqual(10);

    // Vérifie que chaque élément contient les champs attendus
    top10.forEach((rider: any) => {
      expect(rider).toHaveProperty('rank');
      expect(rider).toHaveProperty('riderName');
      expect(rider).toHaveProperty('country');
      expect(rider).toHaveProperty('age');
      expect(rider).toHaveProperty('team');
      expect(rider).toHaveProperty('time');
    });
  });
});
