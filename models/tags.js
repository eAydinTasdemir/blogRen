import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Tags = mongoose.model("Tag", tagsSchema);

export default Tags;
