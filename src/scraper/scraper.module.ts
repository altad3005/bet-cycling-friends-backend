import { Module } from '@nestjs/common';
import { ScraperRaceResult } from './interfaces/scraper-race-result.interface';
import { PcsRaceResultService } from './pcs-race-result.service';
import { ScraperStartlist } from './interfaces/scraper-startlist.interface';
import { PcsStartlistService } from './pcs-startlist.service';

@Module({
  providers: [
    {
      provide: ScraperRaceResult,
      useClass: PcsRaceResultService,
    },
    {
      provide: ScraperStartlist,
      useClass: PcsStartlistService,
    },
  ],
  exports: [ScraperRaceResult, ScraperStartlist],
})
export class ScraperModule {}
