const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우터
const userRouter = require("./userRouter");

// 장바구니 관련 라우터
const cartRouter = require("./cartRouter");

// 제품 리스트 관련 라우터
const productListRouter = require("./productListRouter");

router.use("/user", userRouter.router);
router.use("/cart", cartRouter.router);
router.use("/productlist", productListRouter.router);

module.exports = router;
