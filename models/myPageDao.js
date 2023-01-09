const { myDataSource } = require("./myDataSource");

// 1. 사용자 기본정보 조회
const userInfo = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT 
      username, 
      level,
      point,
      (SELECT COUNT(id) FROM orders WHERE orders.user_id = ?) AS orderCount,
      DATE_FORMAT(created_at, "%Y%m%d %H%i%s") AS userNumber
      FROM users 
      WHERE id = ?;`,
      [userId, userId]
    );
  } catch (err) {
    const error = new Error("INQUIRE_USER_INFO_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  userInfo,
};
