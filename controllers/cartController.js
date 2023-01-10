const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 2. 장바구니 상품 조회
const readCart = asyncErrorHandler(async (req, res) => {
  cartList = await cartService.readCart(req.userId);
  return res.status(200).json(cartList);
});

module.exports = {
  readCart,
};
