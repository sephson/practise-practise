const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");

exports.signup = async (req, res) => {
  const { username } = req.body;

  try {
    const exists = await User.findOne({ username: username });
    if (!exists) {
      const user = await User.create({
        username,
      });
      res.status(200).json(user);
    } else {
      res.status(403).json("already exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    user
      ? res.status(200).json({ message: "success", user })
      : res.status(404).json({ message: "user not found" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPost = async (req, res) => {
  const { poster, content } = req.body;
  try {
    const post = await Post.create({
      poster,
      content,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
