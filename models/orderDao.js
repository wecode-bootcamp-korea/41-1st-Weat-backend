const { myDataSource } = require("./myDataSource");
const queryRunner = myDataSource.createQueryRunner();

// 주문/결제 함수
const order = async (userId, toName, toMobile, toAddress) => {
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // 1. 기본 주문정보 저장 (userId)
    // 1-1. 장바구니에 담긴 총 상품금액 계산
    const [{ totalPrice }] = await queryRunner.query(
      `SELECT
      SUM(carts.quantity * products.price) AS totalPrice
      FROM carts 
      INNER JOIN products ON products.id = carts.product_id
      WHERE carts.user_id = ?;
    `,
      [userId]
    );

    // 1-2. 기본 주문정보 저장
    await queryRunner.query(
      `INSERT INTO orders(
          user_id, total_price
    ) VALUES (?, ?);
    `,
      [userId, totalPrice]
    );

    // 이후 로직에서 사용하기 위해 방금 생성된 order id 를 다시 가져온다.
    const [{ orderId }] = await queryRunner.query(
      `SELECT LAST_INSERT_ID() AS orderId;`
    );

    // 2.  배송지 정보 저장 (deliveries)
    // 보내시는 분 (=사용자) 정보 가져오기
    // const { username, mobile, email } =
    const [{ username, mobile, email }] = await queryRunner.query(
      `SELECT
        username, mobile, email
        FROM users
        WHERE id = ?;`,
      [userId]
    );

    await queryRunner.query(
      `INSERT INTO deliveries(
        from_name, from_mobile, from_email, to_name, to_mobile, to_address, order_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [username, mobile, email, toName, toMobile, toAddress, orderId]
    );

    // 3. 장바구니 -> 주문정보 테이블로 상품정보 복사
    const cartLists = await queryRunner.query(
      `SELECT
        product_id AS productId,
        product_option_id AS productOptionId,
        quantity
      FROM carts
      WHERE user_id = ?;
      `,
      [userId]
    );
    for (list of cartLists) {
      await queryRunner.query(
        `INSERT INTO order_products(
        product_id, product_option_id, quantity, order_id
      ) VALUES (?, ?, ?, ?);
    `,
        [list.productId, list.productOptionId, list.quantity, orderId]
      );
    }

    // 4. 구매 금액만큼 포인트 차감
    // 4-1. 배송비 조회
    const [{ deliveryCharge }] = await queryRunner.query(
      `SELECT 
        delivery_charge AS deliveryCharge
      FROM deliveries
			WHERE order_id = ?;
    `,
      [orderId]
    );

    // 4-2. 상품 총 가격과 배송비를 포인트에서 차감한다.
    await queryRunner.query(
      `UPDATE users
      SET point = point - ? - ?
			WHERE id = ?;
    `,
      [totalPrice, deliveryCharge, userId]
    );

    // 5. 각 제품의 구매한 수량만큼 재고 차감
    // 5-1. 제품 재고 차감
    for (list of cartLists) {
      await queryRunner.query(
        `UPDATE products
        SET stock = stock - ?
        WHERE id = ?;
      `,
        [list.quantity, list.productId]
      );
    }
    // 5-1. 옵션 재고도 차감
    for (list of cartLists) {
      await queryRunner.query(
        `UPDATE product_options
        SET stock = stock - ?
        WHERE id = ?;
      `,
        [list.quantity, list.productOptionId]
      );
    }

    // 6. 각 제품의 구매한 수량만큼 판매량 증가
    for (list of cartLists) {
      await queryRunner.query(
        `UPDATE products
        SET sold = sold + ?
        WHERE id = ?;
    `,
        [list.quantity, list.productId]
      );
    }

    // 7. 장바구니 삭제 (사용자의 장바구니 초기화)
    await queryRunner.query(
      `DELETE FROM carts WHERE user_id = ?
    `,
      [userId]
    );

    await queryRunner.commitTransaction();
    return orderId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const error = new Error("ORDER_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

// 완료된 주문 조회
const getOrderResult = async (userId, orderId) => {
  try {
    const [deliveryObj] = await myDataSource.query(
      `SELECT
        from_name, 
        from_mobile, 
        from_email, 
        to_name, 
        to_mobile, 
        to_address,
        delivery_charge
      FROM deliveries
      WHERE order_id = ?`,
      [orderId]
    );

    const productOrderList = await myDataSource.query(
      `SELECT
        products.thumbnail_image AS thumbnail, 
        products.name AS productName, 
        product_options.name AS optionName,
        products.base_unit AS baseUnit,
        products.price AS price, 
        order_products.quantity AS quantity
      FROM orders
      INNER JOIN order_products ON order_products.order_id = orders.id
      INNER JOIN products ON products.id = order_products.product_id
      INNER JOIN product_options ON product_options.id = order_products.product_option_id
      WHERE orders.id = ?;`,
      [orderId]
    );

    const [{ point }] = await myDataSource.query(
      `SELECT point
      FROM users
      WHERE id = ?`,
      [userId]
    );

    const orderResult = {
      deliveryObj: deliveryObj,
      productOrderList: productOrderList,
      point: point,
    };

    return orderResult;
  } catch (err) {
    const error = new Error("GET_ORDER_RESULT_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  order,
  getOrderResult,
};
