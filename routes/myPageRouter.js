const express = require("express");
const myPageController = require("../controllers/myPageController");

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

const router = express.Router();

// 1. 사용자 기본정보 조회
router.get("/userinfo", validateToken, myPageController.userInfo);

// 2. 주문내역 (cart 모듈에 구현한 주문/결제 조회 API 호출)
// 추후 구현 담당 : 최민주

module.exports = {
  router,
};
