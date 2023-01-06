const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우터
const userRouter = require("./userRouter");
// 장바구니 관련 라우터
const cartRouter = require("./cartRouter");

router.use("/carts", cartRouter.router);
router.use("/users", userRouter.router);

module.exports = router;
