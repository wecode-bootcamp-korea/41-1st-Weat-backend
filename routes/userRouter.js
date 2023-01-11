const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 1. 회원가입
router.post("/signup", userController.signUp);

// 2. 로그인
router.post("/login", userController.login);

// 3. DB → FE 회원정보 제공 (ex : 주문 시 발송정보에 사용할 회원정보 조회)
router.get("/userinfo", validateToken, userController.getUserInfo);

module.exports = {
  router,
};
