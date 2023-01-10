const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 3. 장바구니 상품 삭제
router.delete("/:cartId", validateToken, cartController.deleteCart);

module.exports = {
  router,
};
