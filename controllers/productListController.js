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
const productList = async (req, res) => {
  try {
    const { category_id } = req.params;
    if (!category_id) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }
    cartList = await cartService.readCart(userId);
    return res.status(201).json({ data: cartList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  bestProduct,
  productList,
};
