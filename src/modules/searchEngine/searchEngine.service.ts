import { Injectable } from '@nestjs/common';
import { getYearText } from 'src/@common/utils/getYearText';
import { PublicationDTO } from './dto/publication.dto';
import { SearchDTO } from './dto/search.dto';

const puppeteer = require('puppeteer');

@Injectable()
export class SearchEngineService {
  //constructor() {}

  async search(body: SearchDTO) {
    const URL = 'https://scholar.google.es/';

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--disable-notifications'],
    });

    const page = await browser.newPage();
    await page.goto(URL);
    await page.type('.gs_in_txt', body.q);
    await page.click('#gs_hdr_tsb');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

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

    await browser.close();
    return result;
  }
}
