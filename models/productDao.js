const { myDataSource } = require("./myDataSource");

const productList = async (
  best,
  category,
  page,
  pageNation,
  filter,
  filter_option
) => {
  try {
    const fullQuery = [];
    const defaultQuery = `SELECT id, thumbnail_image, name, price, base_unit, weight_price FROM products`;
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
      if (!pageNation) pageNation = 6;
      if (!filter) filter = "sold";
      if (!filter_option) filter_option = "DESC";

      const orderQuery = `WHERE category_id = ${category} ORDER BY ${filter} ${filter_option} LIMIT ${
        (page - 1) * pageNation
      }, ${pageNation}`;
      fullQuery.push(orderQuery);
    }

    const [{ categoryId }] = await myDataSource.query(
      `SELECT COUNT(category_id) AS categoryId FROM products WHERE category_id=?;`,
      [category]
    );
    const productList = await myDataSource.query(fullQuery.join(" "));

    const categoryProductList = {
      listLength: parseInt(categoryId),
      productList: productList,
    };
    return categoryProductList;
  } catch (err) {
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

// 상세 페이지 & 옵션
const product = async (productId) => {
  try {
    const result = await myDataSource.query(
      ` SELECT
          p.id,
          p.name,
          p.weight_price,
          p.price,
          p.thumbnail_image,
          p.base_unit,
          p.stock,
          p.sold,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "option_id", po.id,
              "option_name", po.name,
              "option_stock", po.stock
              )
          ) AS options
        FROM products p
        LEFT JOIN product_options po ON po.product_id = p.id
        WHERE p.id = ?
        GROUP BY p.id;
      `,
      [productId]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_productId");
    console.log(err);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  productList,
  product,
};
