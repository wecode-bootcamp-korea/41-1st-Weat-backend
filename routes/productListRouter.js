const express = require("express");
const productListController = require("../controllers/productListController");

const router = express.Router();

// Best top6 개 제품 데이터를 제공하는 API
router.get("/best", productListController.bestProduct);

module.exports = {
  router,
};
