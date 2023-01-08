const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 보유 포인트 조회
const getUserPoint = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const point = await orderService.getUserPoint(userId);
  return res.status(201).json({ point });
});

// 주문/조회
const order = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;
  const { ordersObj } = req.body;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }
  if (!ordersObj) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await orderService.order(userId, ordersObj);
  return res.status(201).json({ message: "ORDER_SUCCESS" });
});

// 주문내역 조회
const read = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const resultOrder = await orderService.read(userId);
  return res.status(201).json({ resultOrder });
});

module.exports = {
  getUserPoint,
  order,
  read,
};
