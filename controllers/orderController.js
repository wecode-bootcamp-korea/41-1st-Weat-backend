const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

const order_tmp_obj = {
  deliveryData: {
    address: {
      from_name: undefined,
      from_mobile: undefined,
      from_email: undefined,
      to_name: undefined,
      to_mobile: undefined,
      to_address: undefined,
    },
    receive: {
      date: undefined,
      time: undefined,
    },
    request: {
      enter: undefined,
      alert: undefined,
    },
  },
};

// 주문 프로세스
// Controllers
// 현재 로그인된 사용자의 장바구니 물건 전부 주문으로 넘김
// const userId = req.userId; 필요.

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
// carts : `id`, `user_id`, `quantity`, `product_id`, `product_option_id`

// deliveries : `id`, `from_name`, `from_mobile`, `from_email`, `to_name`, `to_mobile`, `to_address`, `order_id`

const getUserPoint = asyncErrorHandler(async (req, res) => {
  // 2. 배송정보
  const userId = req.userId;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await orderService.getUserPoint(userId);
  return res.status(201).json({ message: "GET_POINT_SUCCESS" });
});

// userId, totalPrice
const order = asyncErrorHandler(async (req, res) => {
  // 2. 배송정보
  const userId = req.userId;
  const { deliveryData } = req.body;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }
  if (
    !deliveryData.from_name ||
    !deliveryData.from_mobile ||
    !deliveryData.from_email ||
    !deliveryData.to_name ||
    !deliveryData.to_mobile ||
    !deliveryData.to_address
  ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await orderService.order(userId, deliveryData);
  return res.status(201).json({ message: "ORDER_SUCCESS" });
});

module.exports = {
  getUserPoint,
  order,
};
