require("dotenv").config();
const cartDao = require("../models/cartDao");

// 2. 장바구니 조회
const readCart = async (userId) => {
  return await cartDao.readCart(userId);
};

// 3. 장바구니 아이템 삭제
const deleteCart = async (cartId) => {
  await cartDao.deleteCart(cartId);
};

module.exports = {
  deleteCart,
  readCart,
};
