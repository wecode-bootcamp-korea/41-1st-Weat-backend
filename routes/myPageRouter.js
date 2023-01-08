const express = require("express");
const myPageController = require("../controllers/myPageController");

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

const router = express.Router();

// 1. 사용자 기본정보 조회
router.get("/userinfo", validateToken, myPageController.userInfo);

// 2. 개인정보관리
// 2-1.사용자 정보 조회
router.get("/private/read", validateToken, myPageController.readPrivateInfo);

// 2-2. 사용자 정보 수정
router.post(
  "/private/update",
  validateToken,
  myPageController.updatePrivateInfo
);

// 3. 주문내역 (cart 모듈에 구현한 주문/결제 조회 API 호출)

// 4. 적립금내역 (이전 사용내역까지?)
// 간단히 구현하려면 orders 테이블을 조회하여 total_price 만 가져와서 뿌려도 됨.

module.exports = {
  router,
};
