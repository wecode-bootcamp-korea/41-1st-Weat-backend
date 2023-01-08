const productService = require("../services/productService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 상세 페이지 & 옵션
const getProductDetail = asyncErrorHandler( async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await productService.getProductDetail(productId);

        if ( !product[0]) {
            throw new Error( "NOT_PRODUCTID" )
        };
        return res.status(200).json({ data : product });

    } catch (error) {
        console.log(error)
        error.statusCode = 500;
        throw error;
    }
});

module.exports = {
    getProductDetail
};