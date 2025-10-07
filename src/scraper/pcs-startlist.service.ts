import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Rider } from './domain/rider';
import { ScraperStartlist } from './interfaces/scraper-startlist.interface';

@Injectable()
export class PcsStartlistService implements ScraperStartlist {
  async getStartList(raceId: string, year: string): Promise<Rider[]> {
    const url = `https://www.procyclingstats.com/race/${raceId}/${year}/startlist`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const riders: Rider[] = [];

    $('ul.startlist_v4 > li').each((i, teamLi) => {
      const teamName = $(teamLi)
        .find('div.ridersCont > div > a.team')
        .text()
        .trim();

      $(teamLi)
        .find('div.ridersCont > ul > li')
        .each((j, riderLi) => {
          const name = $(riderLi).find('a').text().trim();
          const flagClass = $(riderLi).find('span.flag').attr('class') || '';
          const country = flagClass.split(' ')[1] || '';
          riders.push(new Rider(name, teamName, country));
        });
    });

    return riders;
  }
}
