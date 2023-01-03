const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// 회원가입
router.post("/signup", userController.signUp);

module.exports = {
  router,
};
