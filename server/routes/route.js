const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

const {
  signup,
  signin,
  createPost,
  createComment,
  likePost,
  singlePost,
  getComment,
} = controller;

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/createpost").post(createPost);
router.route("/create-com").post(createComment);
router.route("/single-post/:postId").get(singlePost);
router.route("/getcomment/:postId").get(getComment);
router.route("/like/:postId").put(likePost);

module.exports = router;
