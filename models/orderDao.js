const { myDataSource } = require("./myDataSource");

// 주문/결제 내역 조회
const read = async (userId) => {
  try {
    const orderList = await myDataSource.query(
      `SELECT
        orders.id AS orderId,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'thumbnail', products.thumbnail_image,
            'productName', products.name,
            'optionName', product_options.name,
            'price', products.price,
            'quantity', order_products.quantity
          )
        )AS List
        FROM orders
        INNER JOIN order_products ON order_products.order_id = orders.id
        INNER JOIN products ON products.id = order_products.product_id
        INNER JOIN product_options ON product_options.id = order_products.product_option_id
        WHERE orders.user_id = ?
        GROUP BY orders.id
        ORDER BY orders.id DESC;`,
      [userId]
    );
    return orderList;
  } catch (err) {
    const error = new Error("INQUIRE_ORDER_RESULT_DB_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  read,
};
