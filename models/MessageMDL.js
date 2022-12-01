import { model, Schema } from "mongoose";
const ChatSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  talkersIds: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
const MessageMDL = new model("Chat", ChatSchema);
export default MessageMDL;
