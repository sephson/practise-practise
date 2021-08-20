const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

const { signup, signin, createPost } = controller;

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/createpost").post(createPost);

module.exports = router;
