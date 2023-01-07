const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

router.post("/userpoint", validateToken, orderController.getUserPoint);

module.exports = {
  router,
};
