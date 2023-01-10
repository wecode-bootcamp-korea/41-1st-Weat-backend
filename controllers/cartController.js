const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 1. 장바구니 상품 추가 / 수량 변경 (주문수량 증가/감소)
const upsertCart = asyncErrorHandler(async (req, res) => {
  const { productId, productOptionId, quantity } = req.body;

  if (!productId || !productOptionId || !quantity) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await cartService.upsertCart(
    req.userId,
    productId,
    productOptionId,
    quantity
  );
  return res.status(201).json({ message: "UPDATE_CART_SUCCESS" });
});

// 2. 장바구니 상품 조회
const readCart = asyncErrorHandler(async (req, res) => {
  cartList = await cartService.readCart(req.userId);
  return res.status(200).json(cartList);
});

module.exports = {
  upsertCart,
  readCart,
};
