require("dotenv").config();
const orderDao = require("../models/orderDao");

const read = async (userId) => {
  return await orderDao.read(userId);
};

module.exports = {
  read,
};
