const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

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

exports.createPost = (req, res) => {
  const post = new Post(req.body);

  post.save((err, post) => {
    if (err) return res.json({ success: false, err });

    Post.find({ _id: post._id })
      .populate("poster")
      .exec((err, result) => {
        if (err) return res.status(500).json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
};

exports.createComment = (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("commenterId")
      .populate("postId")
      .populate("responseTo")
      .exec((err, result) => {
        if (err) return res.status(500).json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
};

exports.singlePost = async (req, res) => {
  try {
    const p = await Post.findOne({ _id: req.params.postId })
      .populate("poster")
      .populate("likes");

    p
      ? res.status(200).json({ success: true, p })
      : res.status(404).json("not found");
  } catch (err) {
    res.status(500).json(err);
  }
};

//method two
// exports.singlePost = (req, res) => {
//   Post.find({ _id: req.params.postId })
//     .populate("poster")
//     .exec((err, result) => {
//       if (err) return res.status(500).json({ success: false, err });
//       return res.status(200).json({ success: true, result });
//     });
// };

exports.likePost = async (req, res) => {
  try {
    const findPost = await Post.findOne({ _id: req.params.postId }).populate(
      "likes"
    );
    const check = findPost.likes.map((item) => item._id);
    if (!check.includes(req.body.like)) {
      await findPost.updateOne({ $push: { likes: req.body.like } });
      res.status(200).json({ message: "Post Liked" });
    } else {
      await findPost.updateOne({ $pull: { likes: req.body.like } });
      res.status(200).json({ message: "Post UnLiked" });
    }
    // res.json(check);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getComment = async (req, res) => {
  try {
    const com = await Comment.find({ postId: req.params.postId })
      .populate("commenterId")
      .populate("postId")
      .populate("responseTo");

    com
      ? res.status(200).json({ success: true, com })
      : res.status(404).json("not found");
  } catch (err) {
    res.status(500).json(err);
  }
};
