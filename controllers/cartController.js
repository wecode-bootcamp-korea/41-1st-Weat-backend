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

// 3. 장바구니 상품 수정 (주문수량 증가/감소)
// request 파라미터로 상품의 id (itemId) 전달받아 DB 업데이트
// request body 에서 전달받은 count로 주문수량 업데이트
// API 문서 작성 시 프론트에서 {"count" : 10} 형태로 request 날려달라고 하기.
const update = async (req, res) => {
  try {
    const { count } = req.body;
    // 만약 프론트에서 cartId 를 body 에 담아서 전달할 경우
    // const { itemId, count } = req.body;
    // 하지만 보통 파라미터로 전달하지 않을까
    const { itemId } = req.params;
    const userId = req.userId;

    if (!count || !itemId || !userId) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }
    // 프론트에 수정 완료된 결과를 보내줘야 할 경우 다음 로직을 쓴다
    // updated = await cartService.update(count, itemId, userId);
    // return res.status(201).json({ data: updated });

    // 프론트에 수정 완료 결과 성공 여부만 보내줄 경우엔 다음 로직을 쓴다
    await cartService.update(count, cartId, userId);
    return res.status(201).json({ message: "UPDATE_CART_SUCCESS" });
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
  update,
  // delete,
};
