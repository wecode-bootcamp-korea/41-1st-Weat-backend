const express = require("express");
const productListController = require("../controllers/productListController");

const router = express.Router();

// Best top6 개 제품 데이터를 제공하는 API
router.get("/best", productListController.bestProduct);

// 프론트로부터 카테고리 id를 request parameter 로 받아 제품 데이터를 제공하는 API
// ex) 정육각 구현 : /list?tab=pork
router.get("/list/:category_id", productListController.productList);

module.exports = {
  router,
};
