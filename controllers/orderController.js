const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// (1) 사용자 정보 리턴 (BE -> FE)
const getUserInfo = asyncErrorHandler(async (req, res) => {
  const userInfo = await orderService.getUserInfo(req.userId);
  return res.status(200).json(userInfo);
});

// (2) 주문/결제 && 주문번호(id) 리턴
const order = asyncErrorHandler(async (req, res) => {
  const { toName, toMobile, toAddress } = req.body;

  if (!toName || !toMobile || !toAddress) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  const orderId = await orderService.order(
    req.userId,
    toName,
    toMobile,
    toAddress
  );
  return res.status(200).json({ orderId: orderId });
});

// (3) 완료된 주문 조회
const getOrderResult = asyncErrorHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  const orderResult = await orderService.getOrderResult(req.userId, orderId);
  return res.status(200).json(orderResult);
});

module.exports = {
  getUserInfo,
  order,
  getOrderResult,
};
