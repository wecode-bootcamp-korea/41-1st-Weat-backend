const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우터
const usersRouter = require("./userRouter");
// 제품 리스트 관련 라우터
const productsRouter = require("./productRouter");
// 장바구니 관련 라우터
const cartsRouter = require("./cartRouter");
// 결제 관련 라우터
const ordersRouter = require("./orderRouter");
// 마이페이지 라우터
const myPageRouter = require("./myPageRouter");

router.use("/users", usersRouter.router);
router.use("/products", productsRouter.router);
router.use("/carts", cartsRouter.router);
router.use("/orders", ordersRouter.router);
router.use("/mypage", myPageRouter.router);

module.exports = router;
