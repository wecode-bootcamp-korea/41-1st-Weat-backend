const { myDataSource } = require("./myDataSource");

// 메인페이지에 노출할 판매량 상위 제품을 DB에서 찾아 배열에 담아 리턴
// 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
// 상위 6개 제품만 리턴
const bestProduct = async (categoryId) => {
  try {
    let condition = "";
    if (cateogryId) {
      condition = [categoryId];
    }
    return await myDataSource.query(
      `SELECT 
      thumbnail_image, 
      name,
      price,
      base_unit
      FROM products
      ORDER BY sold DESC
      LIMIT 6`,
      condition
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// 카테고리 페이지에 노출할 제품을 DB에서 찾아 배열에 담아 리턴
// 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
// 판매량 순으로 정렬하여 리턴
// ex) SELECT id FROM likes ORDER BY post_id LIMIT 0, 4;
const categoryList = async (category_id) => {
  try {
    return await myDataSource.query(
      `SELECT 
      thumbnail_image, 
      name,
      price,
      base_unit
      FROM products
      WHERE category_id = ?
      ORDER BY sold DESC`,
      [category_id]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  bestProduct,
  categoryList,
};
