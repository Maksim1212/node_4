const puppeteer = require('puppeteer');
const fs = require('fs');
// const path = require('path');
// const prompt = require('prompt');
const fetch = require('isomorphic-fetch');
const { Dropbox } = require('dropbox');

const websiteAddress = 'http://localhost:3000/v1/users';
const imageName = 'screen.png';
const accessTokenData = 'q24GClcTzDAAAAAAAAAAJwhVUMlqe2MUgQKU8soshKktOUHZjDMrKhsGgYkGaWf9';
const dbx = new Dropbox({ accessToken: accessTokenData, fetch });
const imagePath = `images/${imageName}`;

(async() => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(websiteAddress);
        await page.screenshot({ path: imagePath });
        //  await page.pdf({ path: 'first.pdf', format: 'A4' });
        // console.log(dbx);
        await dbx.filesUpload({ path: `/puppeteer/${imagePath}`, contents: fs.createReadStream(imagePath) });
        // const sharedData = await dbx.sharingCreateSharedLinkWithSettings({ path: `/puppeteer/${imagePath}` });
        //  await sharedData.pdf({ path: 'url.pdf', format: 'A4' });
        //  console.log(sharedData);
        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();
