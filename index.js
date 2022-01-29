const axios = require("axios");
const cheerio = require("cheerio");

axios
  .get(
    "https://www.tistory.com/category/getMoreCategoryPost.json?category=life&lastPublished=0&first=true"
  )
  .then((response) => {
    const htmlString = response.data;
    // 웹 사이트 로드
    // const $ = cheerio.load(htmlString);
    // const href = $('a').attr('href');
    console.dir(htmlString.data.list);
  });
