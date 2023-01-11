const { myDataSource } = require("./myDataSource");

const createUser = async (email, hashedPassword, username, mobile) => {
  try {
    return await myDataSource.query(
      `INSERT INTO users(
		    email,
		    password,
        username,
		    mobile,
        level,
        point
		) VALUES (?, ?, ?, ?, 1, 0);
		`,
      [email, hashedPassword, username, mobile]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserData = async (email) => {
  try {
    // 입력받은 email 과 매치되는 hashedPassword 와 userId를 DB 로부터 가져오기
    const userData = await myDataSource.query(
      `SELECT password AS hashedPassword, id AS userId
            FROM users 
            WHERE email = ?;
      `,
      [email]
    );
    return userData;
  } catch (err) {
    const error = new Error("GET_USER_DATA_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

// 3. 사용자 정보 리턴
const getUserInfo = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT
        username, email, mobile, point
        FROM users
        WHERE id = ?;`,
      [userId]
    );
  } catch (err) {
    const error = new Error("GET_USER_INFO_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserData,
  getUserInfo,
};
