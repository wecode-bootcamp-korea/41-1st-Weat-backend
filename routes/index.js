const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우
const userRouter = require("./userRouter");
//상세 페이지, 옵션 라우터, 제품 리스트 관련 라우터
const productRouter = require("./productRouter");
// 장바구니 관련 라우터
const cartsRouter = require("./cartRouter");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/carts", cartsRouter.router);

module.exports = router;
