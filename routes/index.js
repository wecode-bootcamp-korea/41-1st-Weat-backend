const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우터
const userRouter = require("./userRouter");
// 제품 리스트 관련 라우터
const productRouter = require("./productRouter");
// 장바구니 관련 라우터
const cartsRouter = require("./cartRouter");
// 결제 관련 라우터
const ordersRouter = require("./orderRouter");

router.use("/users", usersRouter.router);
router.use("/products", productsRouter.router);
router.use("/carts", cartsRouter.router);
router.use("/orders", ordersRouter.router);

module.exports = router;
