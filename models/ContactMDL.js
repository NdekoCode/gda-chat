import { model, Schema } from "mongoose";

const ContactSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  userId: Schema.Types.ObjectId,
});
const ContactMDL = new model("Contact", ContactSchema);
