const express = require("express");
const productListController = require("../controllers/productListController");

const router = express.Router();

// Best top6 개 제품 데이터를 제공하는 API
// router.get("/best", productListController.productList);

// 프론트로부터 카테고리 id를 request parameter 로 받아 제품 데이터를 제공하는 API
// ex) 정육각 구현 : /list?tab=pork

// postman) localhost:3000/lists?category=pork&page=2&order=
// 카테고리 기본화면
// url/lists
// 메인화면 top6
// url/lists?best
// 선택 카테고리 없음(기본값 돼지), 첫 페이지(기본값, 1)
// url/lists
// 선택 카테고리 = 1(pork), 2페이지
// url/lists?category=1&page=2

router.get("/", productListController.productList);

// router.get("/:category_id/:pageNumber", productListController.productList);

module.exports = {
  router,
};
