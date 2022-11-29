import { model, Schema } from "mongoose";
const ChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
const MessageMDL = new model("Chat", ChatSchema);
export default MessageMDL;
