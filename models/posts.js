import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    content: { type: String },

    image: { type: String, default: "" },

    username: {
      type: String,
      required: false,
    },

    likes: {
      type: Array,
      default: [],
    },
    tag: {
      type: Array,
      required: false,
    },
    comment: {
      type: Array,
      require: false,
    },
    paidPost: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
