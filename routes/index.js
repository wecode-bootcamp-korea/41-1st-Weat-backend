const express = require("express");
const router = express.Router();
// 장바구니 관련 라우터
const cartsRouter = require("./cartRouter");

router.use("/carts", cartsRouter.router);

module.exports = router;
