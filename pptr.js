const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 1080,
  });
  await page.goto("https://www.tistory.com/category/life");
  //   await page.screenshot({ path: "example.png" });
  //   await browser.close();
})();
