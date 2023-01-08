const productDao = require('../models/productDao');

// 상세 페이지 & 옵션
const getProductDetail = async (productId) => {
    
    const product = await productDao.product( productId )

    return product;
};

module.exports = {
    getProductDetail
};

