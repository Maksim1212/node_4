const puppeteer = require('puppeteer');
const GrabbingModel = require('../tmp/GrabbingModel');

const websiteAddress = 'http://localhost:3000/v1/users';

(async() => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(websiteAddress);
        await page.waitForSelector('tbody');

        const result = await page.evaluate(() => {
            const dataAll = document.querySelectorAll('td');
            const dataArr = [];

            dataAll.forEach((td) => {
                dataArr.push(td.innerText);
            });

            return dataArr;
        });

        const emails = await result.filter(str => str.match(/@/g));
        console.log(emails);
        emails.forEach(async(email) => {
            await GrabbingModel.create({ email }); // wrtite email data to db
        });

        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();
