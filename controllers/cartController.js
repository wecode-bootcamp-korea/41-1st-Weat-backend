const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 2. 장바구니 상품 조회
const readCart = asyncErrorHandler(async (req, res) => {
  cartList = await cartService.readCart(req.userId);
  return res.status(200).json(cartList);
});

// 3. 장바구니 상품 삭제
const deleteCart = asyncErrorHandler(async (req, res) => {
  const { cartId } = req.params;

  if (!cartId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await cartService.deleteCart(cartId);
  return res.status(204).json({
    message: "DELETE_CART_SUCCESS",
  });
});

module.exports = {
  readCart,
  deleteCart,
};
