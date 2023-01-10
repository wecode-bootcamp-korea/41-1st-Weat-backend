const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 1. DB → FE (객체 하나로 묶어서.)
router.get("/", validateToken, orderController.getUserInfo);

// 2. 주문/결제
router.post("/", validateToken, orderController.order);

// 3. 주문 완료 화면
router.get("/:orderId", validateToken, orderController.getOrderResult);

module.exports = {
  router,
};
