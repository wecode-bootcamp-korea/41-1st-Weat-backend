const express = require("express");
const productController =  require("../controllers/productController");

const router = express.Router();

// 상세 페이지 & 옵션
router.get("/:productId",productController.getProductDetail);
router.get("/", productController.productList);

// Best top6 개 제품 데이터를 제공하는 API
// router.get("/best", productController.productList);

// 프론트로부터 카테고리 id를 request parameter 로 받아 제품 데이터를 제공하는 API
// ex) 정육각 구현 : /products?tab=pork

// postman) localhost:3000/products?category=pork&page=2&order=
// 카테고리 기본화면
// url/products
// 메인화면 top6
// url/products?best
// 선택 카테고리 없음(기본값 돼지), 첫 페이지(기본값, 1)
// url/products
// 선택 카테고리 = 1(pork), 2페이지
// url/products?category=1&page=2

module.exports = {
    router
};


