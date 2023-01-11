const express = require("express");
const router = express.Router();

<<<<<<< HEAD
// 회원가입, 로그인 등 사용자 정보 관련 라우터
const userRouter = require("./userRouter");
// 제품 리스트 관련 라우터
const productRouter = require("./productRouter");
// 장바구니 관련 라우터
const cartRouter = require("./cartRouter");
// 결제 관련 라우터
const orderRouter = require("./orderRouter");

router.use("/users", userRouter.router);
=======
const userRouter = require("./userRouter");
// 회원가입, 로그인 등 사용자 정보 관련 라우
const productRouter = require("./productRouter");

router.use("/users", userRouter.router);
//상세 페이지, 옵션 라우터, 제품 리스트 관련 라우터
>>>>>>> origin/feature/sangwoo-Review
router.use("/products", productRouter.router);
router.use("/carts", cartRouter.router);
router.use("/orders", orderRouter.router);

module.exports = router;



