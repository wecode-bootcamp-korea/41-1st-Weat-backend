const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 1. 장바구니 상품 담기
router.post("/create", validateToken, cartController.create);

// 2. 장바구니 상품 조회
router.get("/read", validateToken, cartController.read);

// 3. 장바구니 상품 수정
// router.put("/update", validateToken, cartController.update);

// 4. 장바구니 상품 삭제
// router.delete("/delete", validateToken, cartController.delete);

module.exports = {
  router,
};
