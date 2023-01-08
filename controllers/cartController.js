const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

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
  deleteCart,
};
