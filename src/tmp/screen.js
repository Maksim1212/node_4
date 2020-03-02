const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/v1/users');
    await page.screenshot({ path: 'screen.png' });

    await browser.close();
})();