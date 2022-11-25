import { model, Schema } from "mongoose";
const ChatSchema = new Schema({
  userIdA: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userIdB: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  send_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  // converstationId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Conversation",
  // },
  createadAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
const ChatMDL = new model("Chat", ChatSchema);
export default ChatMDL;
