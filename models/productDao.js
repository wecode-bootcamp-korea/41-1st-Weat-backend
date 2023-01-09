const { myDataSource } = require("./myDataSource");

// 상세 페이지 & 옵션
const product = async ( productId ) => {
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
      `, [ productId ]
    );
    return result
  } catch (err) {
    const error = new Error("INVALID_DATA_productId");
    console.log(err);
    error.statusCode = 400;
    throw error;
  };
};

module.exports = {
  product
};