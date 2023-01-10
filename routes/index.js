const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
// 회원가입, 로그인 등 사용자 정보 관련 라우
const productRouter = require("./productRouter");

router.use("/users", userRouter.router);
//상세 페이지, 옵션 라우터, 제품 리스트 관련 라우터
router.use("/products", productRouter.router);

module.exports = router;



