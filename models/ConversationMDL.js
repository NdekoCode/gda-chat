import { model, Schema } from "mongoose";

const ConversationSchame = new Schema({
  participants: [Schema.Types.ObjectId],
});
const ConversationMDL = new model("Conversation", ConversationSchame);
export default ConversationMDL;
