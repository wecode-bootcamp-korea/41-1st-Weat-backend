const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 1. 장바구니 상품 추가 / 수량 변경 (주문수량 증가/감소)
const upsertCart = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;
  const { productId, productOptionId, quantity } = req.body;

  if (!userId || !productId || !productOptionId || !quantity) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await cartService.upsertCart(userId, productId, productOptionId, quantity);
  return res.status(201).json({ message: "UPDATE_CART_SUCCESS" });
});

// 2. 장바구니 상품 조회
const readCart = asyncErrorHandler(async (req, res) => {
  // JWT 로부터 추출한 user id
  const userId = req.userId;
  if (!userId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  cartList = await cartService.readCart(userId);
  return res.status(201).json(cartList);
  // return res.status(201).json({ data: cartList });
});

// 4. 장바구니 상품 삭제
const deleteCart = asyncErrorHandler(async (req, res) => {
  const { cartId } = req.params;

  if (!cartId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await cartService.deleteCart(cartId);
  return res.status(200).json({
    message: "DELETE_CART_SUCCESS",
  });
});

module.exports = {
  readCart,
  upsertCart,
  deleteCart,
};
