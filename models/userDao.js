const { myDataSource } = require("./myDataSource");

const createUser = async (email, hashedPassword, name, phoneNumber) => {
  try {
    return await myDataSource.query(
      `INSERT INTO users(
		    email,
		    password,
        name,
		    phone_number
		) VALUES (?, ?, ?, ?);
		`,
      [email, hashedPassword, name, phoneNumber]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
