const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우
const userRouter = require("./userRouter");

router.use("/users", userRouter.router);

//상세 페이지, 옵션 라우터

const productRouter = require("./productRouter");

router.use("/products", productRouter.router);

module.exports = router;
