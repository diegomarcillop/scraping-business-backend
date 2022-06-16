import { Injectable } from '@nestjs/common';
import { SearchDTO } from '../dto/search.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
const args = [
  '--disable-notifications',
  '--no-sandbox',
  '--disable-setuid-sandbox',
];

@Injectable()
export class SearchEngineService {
  //constructor() {}

  async searchGoogleAcademy(body: SearchDTO) {
    let publications = [];
    let index = 0;

    while (index < parseInt(body.totalPages)) {
      const URL = `https://scholar.google.es/scholar?start=${body.page}&q=${body.q}`;

      const browser = await puppeteer.launch({
        headless: true,
        args,
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
          authors: publication.querySelector('.gs_a').textContent,
          year: publication.querySelector('.gs_a').textContent,
          quotes:
            publication.querySelectorAll('.gs_ri .gs_fl a')[2].textContent,
          origin: 'scholarGoogle',
        }));
        return publications;
      });

      publications = [...publications, ...result];
      await browser.close();
      index++;
    }
    return publications;
  }

  async searchRedalyc(body: SearchDTO) {
    let publications = [];

    const URL = `https://www.redalyc.org/busquedaArticuloFiltros.oa?q=${body.q}`;

    const browser = await puppeteer.launch({
      headless: true,
      args,
    });

    const page = await browser.newPage();
    await page.goto(URL);

    await page.waitForSelector('#loading', { hidden: true });
    await page.select('select#pageSize', '100');
    await page.waitFor(10000);

    let result = [];

    result = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('.contentcard'));
      const publications = elements.map((publication) => ({
        title: publication.querySelector('.ng-binding').textContent,
        description: publication.querySelector('p .article-contenido')
          .textContent,
        year: publication.querySelector('.articulo-hover .ng-binding')
          .textContent,
        website: publication
          .querySelector('.productos-articulo a')
          .getAttribute('href'),
        journal: publication.querySelector('.nomRevista-hover .ng-binding')
          .textContent,
        origin: 'redalyc',
      }));
      return publications;
    });

    await page.screenshot({ path: 'screenshot_redalyc.png', fullPage: true });

    await browser.close();
    publications = result;

    return publications;
  }

  async searchScielo(body: SearchDTO) {
    try {
      const maxCount = 500;
      let publications = [];

      const URL = `https://search.scielo.org/?q=&lang=pt&count=${maxCount}&from=16&output=site&sort=&format=summary&fb=&page=${body.page}&q=${body.q}&lang=pt`;

      const browser = await puppeteer.launch({
        headless: true,
        args,
      });

      const page = await browser.newPage();
      await page.goto(URL);
      await page.screenshot({ path: 'screenshot_scielo.png', fullPage: true });
      let result = [];

      result = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('.item'));
        const publications = elements.map((publication) => ({
          title: publication.querySelector('.title').textContent,
          authors: publication.querySelector('.authors').textContent,
          website: publication.querySelector('.line a').getAttribute('href'),
          year: publication.querySelectorAll('.source span')[2].textContent,
          origin: 'scielo',
          journal: publication.querySelector('.source .dropdown .showTooltip')
            .textContent,
        }));

        return publications;
      });

      await page.screenshot({ path: 'screenshot_redalyc.png', fullPage: true });

      await browser.close();
      publications = result;

      return publications;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
