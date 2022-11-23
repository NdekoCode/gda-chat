import { Schema, model } from "mongoose";
const ChatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
export const chatMDL = new model("Chat", ChatSchema);
