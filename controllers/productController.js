const productService = require("../services/productService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 메인화면 top6
// url/lists?best

// 선택 카테고리 없음(기본값 1), 첫 페이지(기본값, 1)
// url/lists

// 선택 카테고리 = 2, 기본 페이지(기본값, 1)
// url/lists?category=2

// 선택 카테고리 = 2, 페이지 번호  = 2
// url/lists?category=2&page=2
const productList = asyncErrorHandler(async (req, res) => {
  const { best, category, page, pageNation, filter, filter_option } = req.query;

  const productListArray = await productService.productList(
    best,
    category,
    page,
    pageNation,
    filter,
    filter_option
  );
  return res.status(201).json(productListArray);
});

// 상세 페이지 & 옵션
const getProductDetail = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProductDetail(productId);

    if (!product[0]) {
      throw new Error("NOT_PRODUCTID");
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    error.statusCode = 500;
    throw error;
  }
});

module.exports = {
  productList,
  getProductDetail,
};
