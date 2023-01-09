const productDao = require('../models/productDao');

// 상세 페이지 & 옵션
const getProductDetail = async (productId) => {
    
    const product = await productDao.product( productId )

    return product;
};


// 리뷰
const postProductReview = async (title, content, photo) => {

    const review = await productDao.review(title, content, photo)

    return review
}



module.exports = {
    getProductDetail,
    postProductReview
};

