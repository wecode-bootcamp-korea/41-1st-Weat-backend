const { myDataSource } = require("./myDataSource");

// 메인페이지에 노출할 판매량 상위 제품을 DB에서 찾아 배열에 담아 리턴
// 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
// 상위 6개 제품만 리턴
const bestProduct = async () => {
  try {
    return await myDataSource.query(
      `SELECT 
      users.id AS thumbnail, 
      users.profileImageUrl AS name,
      posts.id AS price,
      posts.imageUrl AS 기준무게/부피/갯수
      FROM products
      INNER JOIN posts ON posts.userId = users.id
      ORDER BY 판매량
      LIMIT 6`
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
};
