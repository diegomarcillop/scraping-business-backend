import { Injectable } from '@nestjs/common';
import { SearchDTO } from './dto/search.dto';

const puppeteer = require('puppeteer');

@Injectable()
export class SearchEngineService {
  //constructor() {}

  async search(body: SearchDTO) {
    let publications = [];
    let index = 0;

    while (index < parseInt(body.totalPages)) {
      const URL = `https://scholar.google.es/scholar?start=${body.page}&q=${body.q}`;

      const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications'],
      });

      const page = await browser.newPage();
      await page.goto(URL);

      await page.screenshot({ path: 'screenshot.png' });
      await page.click('.gs_r.gs_or.gs_scl');

      let result = [];

      result = await page.evaluate(() => {
        const elements = Array.from(
          document.querySelectorAll('.gs_r.gs_or.gs_scl'),
        );
        const publications = elements.map((publication) => ({
          title: publication.querySelector('h3').textContent,
          description: publication.querySelector('.gs_rs').textContent,
          website: publication.querySelector('a').getAttribute('href'),
          author: publication.querySelector('.gs_a').textContent,
        }));
        return publications;
      });

      publications = [...publications, ...result];
      await browser.close();
      index++;
    }

    return publications;
  }
}
