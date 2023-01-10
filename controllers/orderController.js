const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 주문내역 조회
const read = asyncErrorHandler(async (req, res) => {
  const orderList = await orderService.read(req.userId);
  return res.status(201).json(orderList);
});

module.exports = {
  read,
};
