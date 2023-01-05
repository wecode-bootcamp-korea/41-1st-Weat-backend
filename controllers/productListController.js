const productListService = require("../services/productListService");

// 메인페이지에 노출할 판매량 상위 제품을 DB에서 찾아 배열에 담아 리턴
// 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
const bestProduct = async (req, res) => {
  try {
    bestProductList = await productListService.bestProduct();
    return res.status(201).json({ data: bestProductList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 전달받은 카테고리 id별 제품 리스트 리턴
const categoryList = async (req, res) => {
  try {
    const { category_id } = req.params;
    // 카테고리 id 를 전달받지 않았다면 기본 카테고리(첫번째 카테고리) 제품 리스트 리턴
    if (!category_id) {
      category_id = 1;
      // const err = new Error("PARAMETER_ERROR");
      // err.statusCode = 400;
      // throw err;
    }
    categoryList = await productListService.categoryList(category_id);
    return res.status(201).json({ data: categoryList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  bestProduct,
  categoryList,
};
