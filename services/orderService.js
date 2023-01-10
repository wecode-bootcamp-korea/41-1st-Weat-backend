require("dotenv").config();
const orderDao = require("../models/orderDao");

// (1) 사용자 정보 리턴 (BE -> FE)
const getUserInfo = async (userId) => {
  return await orderDao.getUserInfo(userId);
};

// (2) 주문/결제
const order = async (userId, toName, toMobile, toAddress) => {
  return await orderDao.order(userId, toName, toMobile, toAddress);
};
// (3) 완료된 주문 조회
const getOrderResult = async (userId, orderId) => {
  return await orderDao.getOrderResult(userId, orderId);
};

module.exports = {
  getUserInfo,
  order,
  getOrderResult,
};
