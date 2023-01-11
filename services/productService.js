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
const getProductReview = async ( productId ) => {

  const productData = await productDao.getproductId( productId );

  if ( !productData ) {
    const err = new Error("NOT_ProductDataId");
    err.statusCode = 404;
    throw err;
  }

  const reviews = await productDao.getProductReview( productId )

  return reviews
}

module.exports = {
  productList,
  getProductDetail,
  getProductReview
};
