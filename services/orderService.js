require("dotenv").config();
const orderDao = require("../models/orderDao");

const readOrderList = async (userId) => {
  return await orderDao.read(userId);
};

module.exports = {
  read,
};
