const productDao = require('../models/productDao');

require("dotenv").config();

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
// 상세 페이지 & 옵션
const getProductDetail = async (productId) => {
    
  const product = await productDao.product( productId )

  return product;
};


// 리뷰
const getProductReview = async ( reviewId ) => {

    const review = await productDao.review( reviewId )

    return review
}



module.exports = {
  productList,
  getProductDetail,
  getProductReview
};
