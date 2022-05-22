import { Injectable } from '@nestjs/common';

const puppeteer = require('puppeteer');

@Injectable()
export class SearchEngineService {
  //constructor() {}

  async search() {
    const URL = 'https://scholar.google.es/';

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--disable-notifications'],
    });

    const page = await browser.newPage();
    await page.goto(URL);
    await page.type('.gs_in_txt', 'facebook');
    await page.click('#gs_hdr_tsb');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'screenshot.png' });

    const result = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.gs_r.gs_or.gs_scl')).map(
        (el) => el.textContent,
      ),
    );

    await browser.close();

    return {
      result,
    };
  }
}
