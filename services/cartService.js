require("dotenv").config();
const cartDao = require("../models/cartDao");

// 3. 장바구니 아이템 삭제
const deleteCart = async (cartId) => {
  await cartDao.deleteCart(cartId);
};

module.exports = {
  deleteCart,
};
