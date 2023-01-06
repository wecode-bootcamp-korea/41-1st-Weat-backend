const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 1. 장바구니 상품 담기
const createCart = asyncErrorHandler(async (req, res) => {
  const { productId, productOptionId, quantity } = req.body;
  // JWT 로부터 추출한 user id
  const userId = req.userId;

  if (!productId || !productOptionId || !quantity) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await cartService.createCart(userId, productId, productOptionId, quantity);
  return res.status(201).json({
    message: "CREATE_CART_SUCCESS",
  });
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
  return res.status(201).json({ data: cartList });
});

// 3. 장바구니 상품 수정 (주문수량 증가/감소)
// request 파라미터로 상품의 id (itemId) 전달받아 DB 업데이트
// request body 에서 전달받은 count로 주문수량 업데이트
// API 문서 작성 시 프론트에서 {"count" : 10} 형태로 request 날려달라고 하기.
const updateCart = asyncErrorHandler(async (req, res) => {
  const { count } = req.body;
  // 만약 프론트에서 cartId 를 body 에 담아서 전달할 경우
  // const { itemId, count } = req.body;
  // 하지만 보통 파라미터로 전달하지 않을까
  const { itemId } = req.params;
  const userId = req.userId;

  if (!count || !itemId || !userId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  // 프론트에 수정 완료된 결과를 보내줘야 할 경우 다음 로직을 쓴다
  // updated = await cartService.update(count, itemId, userId);
  // return res.status(201).json({ data: updated });

  // 프론트에 수정 완료 결과 성공 여부만 보내줄 경우엔 다음 로직을 쓴다
  await cartService.updateCart(count, cartId, userId);
  return res.status(201).json({ message: "UPDATE_CART_SUCCESS" });
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
  createCart,
  readCart,
  updateCart,
  deleteCart,
};
