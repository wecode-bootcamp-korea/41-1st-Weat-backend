const express = require("express");
const userController = require("../controllers/mainController");

const router = express.Router();

// Best top6 개 제품 데이터를 제공하는 API
router.get("/best", mainController.bestProduct);

module.exports = {
  router,
};
