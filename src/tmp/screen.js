const puppeteer = require('puppeteer');
const fs = require('fs');
const fetch = require('isomorphic-fetch');
const { Dropbox } = require('dropbox');

/**
 * @function
 * @param max
 * @param min
 * @returns random integer number
 */
function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const defaultName = randomInteger(1, 10000); // random image name
const websiteAddress = 'http://localhost:3000/v1/users';
const imageFormat = '.png'; // defaul image format
const imageName = defaultName + imageFormat; // image file name + format
const accessTokenData = 'q24GClcTzDAAAAAAAAAAQbrMxy-ovY5pVNV2d8U1H48bUFOPKbBiZHTE6hKuXQFN';
const dbx = new Dropbox({ accessToken: accessTokenData, fetch });

// open headless chrome,go to website, make screenshot, sent to Dropbox and write link to .txt file
(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(websiteAddress);
        await page.screenshot({ path: imageName }); // make screenshot image
        await dbx.filesUpload({ path: `/${imageName}`, contents: fs.createReadStream(imageName) }); // upload image to Dropbox
        console.log(`image ${imageName} uploaded successfully `);

        const sharedData = await dbx.sharingCreateSharedLinkWithSettings({ path: `/${imageName}` });
        const imageUrl = sharedData.url; // image url for Dropbox

        // write image url to 'dataUrl.txt'
        fs.writeFile('dataUrl.txt', imageUrl, (error) => {
            if (error) throw error;
        });

        // remove image from server
        fs.unlink(imageName, (error) => {
            if (error) throw error;
        });

        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();
