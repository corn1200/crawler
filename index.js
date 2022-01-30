const axios = require("axios");
const fs = require("fs");

let article = {};
const crawler = (pageNumber) => {
  return (
    axios
      // 브런치의 첫 페이지를 가져옵니다
      .get(
        `https://api.brunch.co.kr/v1/search/article?q=IT&page=${pageNumber}&pageSize=20&highlighter=y&escape=y&sortBy=accu`
      )
      // 10 페이지가 될 때 까지 재귀반복하며 데이터를 오브젝트로 저장합니다
      .then((response) => {
        const data = response.data;
        article[pageNumber] = data.data.list.map((item) => {
          return {
            title: item.title,
            contentSummary: item.contentSummary,
            contentId: item.contentId,
          };
        });
        console.log("current page number:", pageNumber);
        const nextNumber = pageNumber + 1;
        if (nextNumber < 10) {
          crawler(nextNumber);
          return;
        }
        // 오브젝트를 json 파일로 저장합니다
        fs.writeFile(
          "brunch_article.json",
          JSON.stringify(article),
          (err, data) => {
            // 오류가 존재할 경우 오류 로그를 찍습니다.
            if (err) {
              console.error(err);
              return;
            }
            console.log("success file write");
          }
        );
      })
  );
};

const data = crawler(1);
