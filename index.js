import puppeteer from "puppeteer";
import fs from "fs";

const openWebPage = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://www.wxample.com");

    await browser.close();
}
// openWebPage();
const captureScreenshoot = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://www.google.com");
    await page.screenshot({ path: "example.png" });

    await browser.close();
}
// captureScreenshoot();
const navigateWeb = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://quotes.toscrape.com/");
    await page.click('a[href="/login"]');
    await new Promise(resolve => setTimeout(resolve, 4000));

    await browser.close();
}
// navigateWeb();
const getDataFromWeb = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://www.example.com");
    const result = await page.evaluate(() => {
        let ar = []
        ar.push(document.querySelector("h1").innerText)
        ar.push(document.querySelector("p").innerText)
        ar.push(document.querySelector("a").innerText)

        return ar;
    })
    console.log('result', result)

    await browser.close();
}
// getDataFromWeb();
const getDataFromWebScrape = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://quotes.toscrape.com");
    const result = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote");
        const data = [...quotes].map(quote => {
            const text = quote.querySelector("span.text").innerText;
            const author = quote.querySelector("small.author").innerText;
            const tags = [...quote.querySelectorAll("a.tag")].map(tag => tag.innerText);
            return { "text": text, "author": author, "tags": tags };
        })

        return data;
    })
    console.log('result', result)
    fs.writeFile("quotes.json", JSON.stringify(result, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to file');
    })
    await browser.close();
}
getDataFromWebScrape();