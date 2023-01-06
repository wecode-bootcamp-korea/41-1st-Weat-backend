require("dotenv").config();

const productListDao = require("../models/productListDao");

const productList = async (best, category, page) => {
  return await productListDao.productList(best, category, page);
};

module.exports = {
  productList,
};
