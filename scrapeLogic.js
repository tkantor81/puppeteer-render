const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, route) => {
    // Launch the browser and open a new blank page
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    try {
        const page = await browser.newPage();
    
        // Navigate the page to a URL
        await page.goto(`https://www.livesport.cz/zapas/${route}/`);

        const selector = '.br__broadcasts';

        // Wait for the page to load
        await page.waitForSelector(selector);

        // Get the HTML content of the selector
        const broadcast = await page.$eval(selector, element => element.innerHTML);

        // Print the content
        console.log(broadcast);
        res.send(broadcast);
    } catch (e) {
        console.error(e);
        res.send(`Something went wrong while running Puppeteer: ${e}`);
    } finally {
        await browser.close();
    }
};

module.exports = { scrapeLogic };