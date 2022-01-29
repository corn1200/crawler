const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 1080,
  });
  await page.goto("https://www.tistory.com/category/life", {
    waitUntil: "networkidle2",
  });
  const html = await page.content();
  const $ = cheerio.load(html);
  const articles = $("ul.list_tistory > li > a").text();
  console.log(articles);
})();
