import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
});

const account = mongoose.model("account", accountSchema);

export default account;
