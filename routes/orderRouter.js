const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// 유저 로그인 여부 검증
const { validateToken } = require("../middlewares/auth.js");

// 주문 전 재고 체크
// FE 기준 [전체상품 주문하기] 버튼 클릭 시 전송되는 프로토콜.
// 리턴값에 따라 재고 소진 팝업창을 띄우거나
// 주소 입력 프로토콜 날려달라고 하기.
router.post("/checkStock", validateToken, orderController.checkStock);
// 주소 입력
router.post("/deliverAddress", validateToken, orderController.order);
// 도착 희망일
router.post("/deliverData", validateToken, orderController.order);

module.exports = {
  router,
};
