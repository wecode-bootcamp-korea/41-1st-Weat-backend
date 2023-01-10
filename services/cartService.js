require("dotenv").config();

const cartDao = require("../models/cartDao");

// 1. 장바구니 상품 수정 (주문수량 증가/감소)
const updateCart = async (count, itemId, userId) => {
  // 1-1. DB로부터 상품 재고 수량을 가져옴
  const stock = await cartDao.getStock(itemId);
  // 1-2. 재고 수량보다 장바구니 수량이 많으면 품절 에러 반환
  if (count > stock) {
    const err = new Error("SOLD_OUT");
    // 에러 코드는 409 가 맞을지, 다른 코드가 더 적절할지?
    err.statusCode = 409;
    throw err;
  }
  // 1-3. 장바구니 수량보다 재고 수가 많거나 같으면
  // 1-4. 장바구니에 고기를 담는다.
  return await cartDao.updateCart(count, itemId, userId);
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
  updateCart,
  deleteCart,
};
