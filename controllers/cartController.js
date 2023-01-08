const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 2. 장바구니 상품 조회
const readCart = asyncErrorHandler(async (req, res) => {
  // JWT 로부터 추출한 user id
  const userId = req.userId;
  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }
  cartList = await cartService.readCart(userId);
  return res.status(201).json(cartList);
  // return res.status(201).json({ data: cartList });
});

module.exports = {
  readCart,
};
