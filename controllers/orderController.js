const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 주문 프로세스
// Controllers
// 현재 로그인된 사용자의 장바구니 물건 전부 주문으로 넘김
// const userId = req.userId; 필요.

// 1. 재고 체크
// 1-1. 재고 조회
// 1-2. 재고 없으면 해당 cartId 에러처리

// 2. 배송정보
// 배송 정보 입력받음
// deliveries : `from_name`, `from_mobile`, `from_email`, `to_name`, `to_mobile`, `to_address`, `order_id`

// Service
// 총 금액 계산
// 포인트 조회 -> 보유 포인트가 더 많으면 Dao 로 넘김
// 적으면 에러처리

// Dao
// 포인트 차감 & 저장
// deliveries.order_id = order.id

// 참고
// orders : `id`, `total_price`, `user_id`
// order_products : `id`, `quantity`, `order_id`, `product_id`, `product_option_id`

// 참고
// carts : `id`, `quantity`, `user_id`, `product_id`, `product_option_id`
const order = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    const err = new Error("USERID_ERROR");
    err.statusCode = 400;
    throw err;
    // const { productId, productOptionId, quantity } = req.body;

    // if (!userId || !productId || !productOptionId || !quantity) {
    //   const err = new Error("KEY_ERROR");
    //   err.statusCode = 400;
    //   throw err;
  }
  await orderService.order(userId, productId, productOptionId, quantity);
  return res.status(201).json({ message: "UPDATE_order_SUCCESS" });
});

// 2. 장바구니 상품 조회
const readorder = asyncErrorHandler(async (req, res) => {
  // JWT 로부터 추출한 user id
  const userId = req.userId;
  if (!userId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  orderList = await orderService.readorder(userId);
  return res.status(201).json(orderList);
  // return res.status(201).json({ data: orderList });
});

// 4. 장바구니 상품 삭제
const deleteorder = asyncErrorHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await orderService.deleteorder(orderId);
  return res.status(200).json({
    message: "DELETE_order_SUCCESS",
  });
});

module.exports = {
  readorder,
  upsertorder,
  deleteorder,
};
