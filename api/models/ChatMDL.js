import { Schema, model } from "mongoose";
const ChatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});
const chatMDL = new model("Chat", ChatSchema);
