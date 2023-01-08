require("dotenv").config();
const orderDao = require("../models/orderDao");

const getUserPoint = async (userId) => {
  return await orderDao.getUserPoint(userId);
};

const order = async (userId, ordersObj) => {
  await orderDao.order(userId, ordersObj);
};

const read = async (userId) => {
  return await orderDao.read(userId);
};

module.exports = {
  getUserPoint,
  order,
  read,
};
