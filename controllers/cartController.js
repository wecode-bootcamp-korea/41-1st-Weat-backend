const cartService = require("../services/cartService");

// 1. 장바구니 상품 담기
// router.post("/create", validateToken, cartController.create);

// 2. 장바구니 상품 조회
// router.get("/read", validateToken, cartController.read);

// 3. 장바구니 상품 수정
// router.put("/update", validateToken, cartController.update);

// 4. 장바구니 상품 삭제
// router.delete("/delete", validateToken, cartController.delete);

// 1. 장바구니 상품 담기
const create = async (req, res) => {
  try {
    const { itemId, thick, count } = req.body;
    // JWT 로부터 추출한 user id
    const userId = req.userId;

    if (!itemId || !thick || !count) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }
    await cartService.create(itemId, thick, count);
    return res.status(201).json({
      message: "CREATE_CART_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 2. 장바구니 상품 조회
const read = async (req, res) => {
  try {
    // JWT 로부터 추출한 user id
    const userId = req.userId;
    if (!userId) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }
    cartList = await cartService.read(userId);
    return res.status(201).json({ data: cartList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// // 4. 전체 게시글 조회
// const showAllPost = async (req, res) => {
//   try {
//     postList = await postService.showAllPost();
//     return res.status(201).json({ data: postList });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

// // 5. 유저 게시글 조회
// const showUserPost = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       const err = new Error("KEY_ERROR");
//       err.statusCode = 400;
//       throw err;
//     }
//     postList = await postService.showUserPost(userId);
//     return res.status(201).json({ data: postList });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

// // 6. 유저 게시글 수정
// const modifyUserPost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { content } = req.body;
//     const userId = req.userId;

//     if (!content || !postId) {
//       const err = new Error("KEY_ERROR");
//       err.statusCode = 400;
//       throw err;
//     }
//     // [postingContent, userId, id]
//     modifiedPost = await postService.modifyUserPost(content, userId, postId);
//     return res.status(201).json({ data: modifiedPost });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

// // 7. 게시글 삭제
// const deletePost = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     if (!postId) {
//       const err = new Error("KEY_ERROR");
//       err.statusCode = 400;
//       throw err;
//     }
//     await postService.deletePost(postId);
//     return res.status(200).json({
//       message: "DELETE_POST_SUCCESS",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
//   }

module.exports = {
  create,
  read,
  // update,
  // delete,
};
