const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 주문내역 조회
router.get("/", validateToken, orderController.read);

module.exports = {
  router,
};
