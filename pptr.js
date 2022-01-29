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
        // 이미지나 페이지 리소스 등이 로드 되길 기다립니다.
        waitUntil: "networkidle2",
    });
    const html = await page.content();
    const $ = cheerio.load(html);
    // a 태그의 href 값들을 담을 배열
    let hrefArray = [];
    // 가져온 엘리먼트들을 순회하며 href 값을 배열에 저장합니다.
    const articles = $("ul.list_tistory > li > a").each((index, element) => {
        const href = $(element).attr("href");
        hrefArray.push(href);
    });
    console.log(hrefArray);
})();
