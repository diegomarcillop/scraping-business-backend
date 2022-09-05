import { Injectable } from '@nestjs/common';

import { SearchDTO } from '../dto/search.dto';

const PAGE_DEFAULT = 1;
const TOTAL_PAGE_DEFAULT = '10';

@Injectable()
export class SearchEngineService {
  //constructor() {}

  async searchGoogleAcademy(body: SearchDTO, browser: any) {
    try {
      let publications = [];
      let index = 0;

      while (index < parseInt(body.totalPages || TOTAL_PAGE_DEFAULT)) {
        const URL = `https://scholar.google.es/scholar?start=${
          body.page || PAGE_DEFAULT
        }&q=${body.q}`;

        const page = await browser.newPage();
        await page.goto(URL, { timeout: 0 });

        await page.click('.gs_r.gs_or.gs_scl');

        let result = [];

        result = await page.evaluate(() => {
          const elements = Array.from(
            document.querySelectorAll('.gs_r.gs_or.gs_scl'),
          );

          const publications = elements?.map((publication) => ({
            title: publication.querySelector('h3').textContent,
            description: publication.querySelector('.gs_rs').textContent,
            siteUrl: publication.querySelector('a').getAttribute('href'),
            authors: publication.querySelector('.gs_a').textContent,
            year: publication.querySelector('.gs_a').textContent,
            quotes:
              publication.querySelectorAll('.gs_ri .gs_fl a')[2].textContent,
            origin: 'ScholarGoogle',
          }));
          return publications;
        });

        publications = [...publications, ...result];
        index++;
      }
      return publications;
    } catch (e) {
      console.error('SholarGoogle', e);
    }
  }

  //Pages [10, 20, 30, 40, 50, 60, 80, 100]
  async searchRedalyc(body: SearchDTO, browser: any) {
    let publications = [];
    const URL = `https://www.redalyc.org/busquedaArticuloFiltros.oa?q=${body.q}`;

    const page = await browser.newPage();
    await page.goto(URL, { timeout: 0, waitUntil: 'networkidle2' });

    await page.waitForSelector('.contentcard');
    await page.select('select#pageSize', body.quantity.toString());
    await page.waitForTimeout(10000);

    let result = [];

    result = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('.contentcard'));
      const publications = elements.map((publication) => ({
        title: publication.querySelector('.ng-binding').textContent,
        description: publication.querySelector('p .article-contenido')
          .textContent,
        year: publication.querySelector('.articulo-hover .ng-binding')
          .textContent,
        siteUrl: publication
          .querySelector('.productos-articulo a')
          .getAttribute('href'),
        journal: publication.querySelector('.nomRevista-hover .ng-binding')
          .textContent,
        origin: 'Redalyc',
      }));
      return publications;
    });

    //await page.screenshot({ path: 'screenshot_redalyc.png', fullPage: true });
    publications = result;
    return publications;
  }

  // PAGES: [LIBRES]
  async searchScielo(body: SearchDTO, browser: any) {
    try {
      body.q = body.q.split(' ').join('+');
      const maxCount = 100;
      let publications = [];
      const URL = `https://search.scielo.org/?q=${body.q}&lang=pt&count=${
        body.quantity || maxCount
      }&from=${
        body.quantity * (body.page - 1) + 1
      }&output=site&sort=&format=summary&fb=&page=${
        body.page || PAGE_DEFAULT
      }&q=${body.q}&lang=pt`;

      const page = await browser.newPage();
      await page.goto(URL, { timeout: 0, waitUntil: 'networkidle2' });
      //await page.screenshot({ path: 'screenshot_scielo.png', fullPage: true });
      let result = [];

      result = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('.item'));
        const publications = elements.map((publication) => ({
          title: publication.querySelector('.title')?.textContent,
          authors: publication.querySelector('.authors')?.textContent,
          siteUrl: publication.querySelector('.line a').getAttribute('href'),
          year: publication.querySelectorAll('.source span')[2]?.textContent,
          origin: 'Scielo',
          journal: publication.querySelector('.source .dropdown .showTooltip')
            ?.textContent,
        }));

        return publications;
      });

      publications = result;

      return publications;
    } catch (e) {
      console.error('Scielo ', e);
      return [];
    }
  }

  //25 - 50 - 100
  async searchLibgen(body: SearchDTO, browser: any) {
    try {
      let publications = [];
      const URL = `https://libgen.is/search.php?&res=${body.quantity}&req=${body.q}&phrase=0&view=simple&column=def&sort=def&sortmode=ASC&page=${body.page}`;

      const page = await browser.newPage();
      await page.goto(URL, { timeout: 0, waitUntil: 'networkidle2' });
      //await page.screenshot({ path: 'screenshot_libgen.png', fullPage: true });
      let result = [];

      result = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('.c tbody tr'));
        const publications = elements.map((publication) => ({
          title: publication.querySelectorAll('td')[2]?.textContent,
          authors: publication.querySelectorAll('td')[1]?.textContent,
          siteUrl: publication.querySelectorAll('td a')[3].getAttribute('href'),
          year: publication.querySelectorAll('td')[4]?.textContent,
          origin: 'Libgen',
          language: publication.querySelectorAll('td')[6]?.textContent,
          journal: publication.querySelectorAll('td')[3]?.textContent,
        }));

        return publications;
      });

      publications = result;
      publications = publications.filter((item) => item.title !== 'Title');

      return publications;
    } catch (e) {
      console.error('Libgen ', e);
      return [];
    }
  }

  // PAGE = [10, 20, 50]
  async searchDialnet(body: SearchDTO, browser: any) {
    body.q = body.q.split(' ').join('+');
    try {
      let publications = [];
      const URL = `https://dialnet.unirioja.es/buscar/documentos?querysDismax.DOCUMENTAL_TODO=${body.q}&inicio=60`;

      const page = await browser.newPage();
      await page.goto(URL, { timeout: 0, waitUntil: 'networkidle2' });
      //await page.screenshot({ path: 'screenshot_dianet.png', fullPage: true });

      let result = [];

      result = await page.evaluate(() => {
        const elements = Array.from(
          document.querySelectorAll('#listadoDeArticulos li'),
        );
        const publications = elements.map((publication) => ({
          title: publication.querySelector('.descripcion .titulo')?.textContent,
          authors: publication.querySelector('.descripcion .autores')
            ?.textContent,
          siteUrl: publication
            .querySelector('.descripcion .titulo a')
            ?.getAttribute('href'),
          year: publication.querySelectorAll('.localizacion a')[1]?.textContent,
          origin: 'Libgen',
          language: publication.querySelector('.descripcion .titulo')
            ?.textContent,
          journal:
            publication.querySelectorAll('.localizacion a')[0]?.textContent,
        }));

        return publications;
      });

      publications = result;

      return publications;
    } catch (e) {
      console.error('Dianet ', e);
      return [];
    }
  }
}
