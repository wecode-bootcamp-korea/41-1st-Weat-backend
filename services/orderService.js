require("dotenv").config();
const orderDao = require("../models/orderDao");

// 주문/결제
const order = async (userId, toName, toMobile, toAddress) => {
  return await orderDao.order(userId, toName, toMobile, toAddress);
};
// 완료된 주문 조회
const getOrderResult = async (userId, orderId) => {
  return await orderDao.getOrderResult(userId, orderId);
};

module.exports = {
  order,
  getOrderResult,
};
