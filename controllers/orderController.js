const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 보유 포인트 조회
const getUserPoint = asyncErrorHandler(async (req, res) => {
  const point = await orderService.getUserPoint(req.userId);
  return res.status(201).json({ point });
});

// 주문/조회
const order = asyncErrorHandler(async (req, res) => {
  const { ordersObj } = req.body;

  if (!ordersObj) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await orderService.order(req.userId, ordersObj);
  return res.status(201).json({ message: "ORDER_SUCCESS" });
});

// 주문내역 조회
const read = asyncErrorHandler(async (req, res) => {
  const orderList = await orderService.read(req.userId);
  return res.status(201).json({ orderList });
});

module.exports = {
  getUserPoint,
  order,
  read,
};
