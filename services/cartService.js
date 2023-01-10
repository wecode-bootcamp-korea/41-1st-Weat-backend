require("dotenv").config();
const cartDao = require("../models/cartDao");

// 2. 장바구니 조회
const readCart = async (userId) => {
  return await cartDao.readCart(userId);
};

module.exports = {
  readCart,
};
