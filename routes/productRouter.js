const express = require("express");
const productController =  require("../controllers/productController");

const router = express.Router();

// 상세 페이지 & 옵션
router.get("/:productId",productController.getProductDetail);

// 리뷰
router.post("/reviews", productController.postProductReview);

module.exports = {
    router
};