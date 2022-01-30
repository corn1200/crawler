const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 900,
    });

    await page.goto("https://brunch.co.kr/search?q=IT&type=article");
    // 특정 엘리먼트 클릭
    await page.click("input.txt_search");
    // 단어 타이핑 후 엔터 press 이벤트
    await page.keyboard.type("IT");
    await page.keyboard.press("Enter");
    // 네비게이션 로딩까지 지연
    await page.waitForNavigation();

    await page.evaluate(() => {
        // window.scrollBy(0, window.innerHeight);
        console.log(window.innerHeight);
    });
})();
