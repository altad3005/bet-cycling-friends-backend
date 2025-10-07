import { ScraperRaceResult } from './interfaces/scraper-race-result.interface';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PcsRaceResultService implements ScraperRaceResult {
  async getTop10(raceId: string, isGc?: boolean, stage?: string): Promise<any> {
    let url: string;
    if (isGc) {
      url = `https://www.procyclingstats.com/race/${raceId}/gc`;
    } else if (stage) {
      url = `https://www.procyclingstats.com/race/${raceId}/${stage}`;
    } else {
      url = `https://www.procyclingstats.com/race/${raceId}/result`;
    }
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const top10: {
      rank: string;
      riderName: string;
      country: string;
      age: string;
      team: string;
      time: string;
    }[] = [];

    $('table.results tbody tr').each((i, el) => {
      if (i >= 10) return false;

      const rank = $(el).find('td').eq(0).text().trim();
      const age = $(el).find('td.age').text().trim();
      const riderEl = $(el).find('td.ridername a');
      const riderName = riderEl.text().trim();
      const flagClass =
        $(el).find('td.ridername span.flag').attr('class') || '';
      const country = flagClass.split(' ')[1];
      const team = $(el).find('td.cu600 a').text().trim();
      const time = $(el).find('td.time font').text().trim() || '';

      top10.push({ rank, riderName, country, age, team, time });
    });

    return top10;
  }
}
