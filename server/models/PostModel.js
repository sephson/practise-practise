const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new mongoose.Schema(
  {
    poster: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
