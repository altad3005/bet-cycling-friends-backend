import { ScraperStartlist } from '../interfaces/scraper-startlist.interface';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class PcsStartlistService implements ScraperStartlist {
  async getStartList(raceId: string): Promise<any> {
    const url = `https://www.procyclingstats.com/race/${raceId}/startlist`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const riders: { name: string; team: string; country: string }[] = [];

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
          const country = flagClass.split(' ')[1]; // ec, it, fr, etc.
          riders.push({ name, team: teamName, country });
        });
    });

    return riders;
  }
}
