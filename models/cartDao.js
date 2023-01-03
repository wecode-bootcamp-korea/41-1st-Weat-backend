const { myDataSource } = require("./myDataSource");

// 1. 장바구니에 상품 추가
// await cartDao.create(itemId, thick, count);
const create = async (itemId, thick, count) => {
  try {
    return await myDataSource.query(
      `INSERT INTO cart(
		    item_id,
		    thick,
            count
		) VALUES (?, ?, ?);
		`,
      [itemId, thick, count]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

// 2. 장바구니 상품 조회
const read = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT
        users.id AS userId,
        users.profileImageUrl AS userProfileImage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingId", posts.id,
            "posingImageUrl", imageUrl,
            "postingContent", posts.content
          )
        ) AS postings
        FROM posts
        INNER JOIN users ON users.id = posts.userId
        WHERE users.id = ?
        GROUP BY users.id;`,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

const getStock = async (itemId) => {
  try {
    // item DB로부터 itemId 에 해당하는 재고(stock) 을 가져옴
    const [{ stock }] = await myDataSource.query(
      `SELECT stock
        FROM item 
        WHERE item_id = ?;
        `,
      [itemId]
    );
    return stock;
  } catch (err) {
    console.log(err);
    const error = new Error("GET_STOCK_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// const getUserID = async (email) => {
//   try {
//     const [{ userId }] = await myDataSource.query(
//       `
//                 SELECT id AS userId
//                 FROM users
//                 WHERE email = ?;
//                 `,
//       [email]
//     );
//     return userId;
//   } catch (err) {
//     console.log(err);
//     const error = new Error("GET_USER_ID_FAILED");
//     error.statusCode = 500;
//     throw error;
//   }
// };

module.exports = {
  create,
  read,
  getStock,
};
