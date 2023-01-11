require("dotenv").config();

const cartDao = require("../models/cartDao");

// 1. 장바구니 상품 추가 / 수량 변경
const upsertCart = async (userId, productId, productOptionId, quantity) => {
  // 3-1. DB로부터 상품 재고 수량을 가져옴
  const stock = await cartDao.getStock(productOptionId);
  // 3-2. 재고 수량보다 장바구니 수량이 많으면 품절 에러 반환
  if (quantity > stock) {
    const err = new Error("SOLD_OUT");
    // 에러 코드는 409 가 맞을지, 다른 코드가 더 적절할지?
    err.statusCode = 409;
    throw err;
  }
  // 3-3. 장바구니 수량보다 재고 수가 많거나 같으면 장바구니에 제품을 담는다.
  return await cartDao.upsertCart(userId, productId, productOptionId, quantity);
};

// 2. 장바구니 조회
const readCart = async (userId) => {
  return await cartDao.readCart(userId);
};

// 3. 장바구니 아이템 삭제
const deleteCart = async (itemId) => {
  await cartDao.deleteCart(itemId);
};

module.exports = {
  readCart,
  upsertCart,
  deleteCart,
};
