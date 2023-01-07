require("dotenv").config();
const orderDao = require("../models/orderDao");

const getUserPoint = async (userId) => {
  // DB로부터 상품 재고 수량을 가져옴
  return await orderDao.getUserPoint(userId);
};

// 2. 장바구니 조회
const readorder = async (userId) => {
  return await orderDao.readorder(userId);
};

// 4. 장바구니 아이템 삭제
const deleteorder = async (orderId) => {
  await orderDao.deleteorder(orderId);
};

module.exports = {
  getUserPoint,
};
