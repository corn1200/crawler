const axios = require("axios");
const cheerio = require("cheerio");

let article = {};
const crawler = (pageNumber) => {
    return axios
        // 브런치의 첫 페이지를 가져 옵니다
        .get(
            `https://api.brunch.co.kr/v1/search/article?q=IT&page=${pageNumber}&pageSize=20&highlighter=y&escape=y&sortBy=accu`
        )
        // 10 페이지가 될 때 까지 재귀반복하며 데이터를 오브젝트로 저장하고
        // 오브젝트 구조를 출력합니다
        .then((response) => {
            const data = response.data;
            article[pageNumber] = data.data.list;
            console.log("current page number:", pageNumber);
            const nextNumber = pageNumber + 1;
            if (nextNumber < 10) {
                crawler(nextNumber);
                return;
            }
            console.log(article);
        });
};

const data = crawler(1);
