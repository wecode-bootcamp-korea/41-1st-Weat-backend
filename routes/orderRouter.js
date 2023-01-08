const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 보유 포인트 조회
router.get("/point", validateToken, orderController.getUserPoint);
// 주문/결제
router.post("/", validateToken, orderController.order);
// 주문내역 조회
router.get("/read", validateToken, orderController.read);

module.exports = {
  router,
};
