const { myDataSource } = require("./myDataSource");

const pageNation = 9;

const productList = async (best, category, page) => {
  try {
    const fullQuery = [];
    const defaultQuery = `SELECT id, thumbnail_image, name, price, base_unit FROM products`;
    fullQuery.push(defaultQuery);

    // 메인페이지에 노출할 판매량 상위 제품을 DB에서 찾아 배열에 담아 리턴
    // 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
    // 상위 6개 제품만 리턴
    if (best === "") {
      const orderQuery = `ORDER BY sold DESC LIMIT 6`;
      fullQuery.push(orderQuery);
    }
    // 카테고리 페이지에 노출할 제품을 DB에서 찾아 배열에 담아 리턴
    // 리턴 형태 : [{썸네일 : ~, 제품명 : ~, 가격 : ~, 기준무게/부피/갯수 : ~ }...]
    // 판매량 순으로 정렬하여 리턴
    // ex) SELECT id FROM likes ORDER BY post_id LIMIT 0, 3 (0번부터 제품 3개);
    else {
      // category 또는 page 값이 없으면 기본값 1 할당
      if (!category) category = 1;
      if (!page) page = 1;

      const orderQuery = `WHERE category_id = ${category} ORDER BY sold DESC LIMIT ${
        (page - 1) * pageNation
      }, ${pageNation}`;
      fullQuery.push(orderQuery);
    }

    return await myDataSource.query(fullQuery.join(" "));
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  productList,
};
