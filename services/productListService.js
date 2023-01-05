require("dotenv").config();

const productListDao = require("../models/productListDao");

// 메인페이지에 노출할 판매량 상위 제품을 DB에서 찾아 배열에 담아 리턴
// 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
const bestProduct = async () => {
  return await productListDao.bestProduct();
};

// 각 카테고리별 페이지에 노출할 제품을 DB에서 찾아 배열에 담아 리턴
const categoryList = async (category_id) => {
  return await productListDao.categoryList(category_id);
};

module.exports = {
  bestProduct,
  categoryList,
};
