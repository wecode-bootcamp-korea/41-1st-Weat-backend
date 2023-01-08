const { myDataSource } = require("./myDataSource");

const getUserPoint = async (userId) => {
  try {
    const [{ point }] = await myDataSource.query(
      `SELECT point
        FROM users
        WHERE id = ?;`,
      [userId]
    );
    return point;
  } catch (err) {
    const error = new Error("INQUIRE_POINT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

const order = async (userId, ordersObj) => {
  let orderId = undefined;

  // DB에 주문정보 저장
  // 주문정보 생성 (orders) 후 생성된 order.id 리턴
  // 생성된 order.id 를 받아오기 위해 쿼리 뒤에 RETURNING id; 를 붙였는데 RETURNING 이 prstgreSQL 문법이라 여기서는 안 먹습니다.
  // 차선책으로 SELECT LAST_INSERT_ID() AS id 를 썼는데 동시에 여러 주문이 이루어지는 실서비스에서는 부적합할 것 같습니다.
  // INSERT 즉시 id 즉 PK 를 받아오는 방법이 없을까요?
  try {
    await myDataSource.query(
      `INSERT INTO orders(
          user_id, total_price
    ) VALUES (?, ?);
    `,
      [userId, ordersObj.totalPrice]
    );

    // 이후 로직에서 사용하기 위해 방금 생성된 order id 를 저장해둔다.
    [{ orderId }] = await myDataSource.query(
      `SELECT LAST_INSERT_ID() AS orderId;`
    );
  } catch (err) {
    const error = new Error("ORDER_DB_FAILED");
    error.statusCode = 500;
    throw error;
  }

  // 배송지 정보 저장 (deliveries)
  try {
    await myDataSource.query(
      `INSERT INTO deliveries(
        from_name, from_mobile, from_email, to_name, to_mobile, to_address, order_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        ordersObj.deliveries.fromName,
        ordersObj.deliveries.fromMobile,
        ordersObj.deliveries.fromEmail,
        ordersObj.deliveries.toName,
        ordersObj.deliveries.toMobile,
        ordersObj.deliveries.toAddress,
        orderId,
      ]
    );
  } catch (err) {
    const error = new Error("DELIVERIES_DB_FAILED");
    error.statusCode = 500;
    throw error;
  }

  // 상품정보 저장
  try {
    for (product of ordersObj.products) {
      await myDataSource.query(
        `INSERT INTO order_products(
          product_id, product_option_id, quantity, order_id
        ) VALUES (?, ?, ?, ?);
      `,
        [product.id, product.optionId, product.quantity, orderId]
      );
    }
  } catch (err) {
    const error = new Error("ORDER_DB_FAILED");
    error.statusCode = 500;
    throw error;
  }

  // 포인트 차감
  try {
    await myDataSource.query(
      `UPDATE users
      SET point = point - ?
			WHERE id = ?;
    `,
      [ordersObj.totalPrice, userId]
    );
  } catch (err) {
    const error = new Error("PAYMENT_FAILED");
    error.statusCode = 500;
    throw error;
  }

  // 재고 차감
  try {
    for (product of ordersObj.products) {
      await myDataSource.query(
        `UPDATE products
        SET stock = stock - ?
        WHERE id = ?;
      `,
        [product.quantity, product.id]
      );
    }
    // 옵션 재고도 차감
    for (product of ordersObj.products) {
      await myDataSource.query(
        `UPDATE product_options
        SET stock = stock - ?
        WHERE id = ?;
      `,
        [product.quantity, product.optionId]
      );
    }
  } catch (err) {
    const error = new Error("DEDUCT_STOCK_FAILED");
    error.statusCode = 500;
    throw error;
  }

  // 판매량 증가
  try {
    for (product of ordersObj.products) {
      await myDataSource.query(
        `UPDATE products
      SET sold = sold + ?
      WHERE id = ?;
    `,
        [product.quantity, product.id]
      );
    }
  } catch (err) {
    const error = new Error("ADD_SOLD_QUANTITY_FAILED");
    error.statusCode = 500;
    throw error;
  }

  // 장바구니 삭제
  try {
    await myDataSource.query(
      `DELETE FROM carts WHERE user_id = ?
    `,
      [userId]
    );
  } catch (err) {
    const error = new Error("INITIALIZE_CART_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

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
  order,
  getUserPoint,
  read,
};
