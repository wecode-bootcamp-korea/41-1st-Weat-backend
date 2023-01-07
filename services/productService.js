require("dotenv").config();

const productDao = require("../models/productDao");

const productList = async (
  best,
  category,
  page,
  pageNation,
  filter,
  filter_option
) => {
  return await productDao.productList(
    best,
    category,
    page,
    pageNation,
    filter,
    filter_option
  );
};

module.exports = {
  productList,
};
