const express = require("express");
const router = express.Router();

// 회원가입, 로그인 등 사용자 정보 관련 라우터
const usersRouter = require("./userRouter");
// 제품 리스트 관련 라우터
const productListRouter = require("./productListRouter");

router.use("/users", usersRouter.router);
router.use("/lists", productListRouter.router);

module.exports = router;
