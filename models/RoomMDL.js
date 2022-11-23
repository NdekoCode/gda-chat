import { Schema } from "mongoose";

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  messages: [
    {
      send_by: {
        type: Schame.Types.ObjectId,
        ref: "User",
      },
      message: {
        Type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
      },
    },
  ],
  total_message: {
    type: Number,
  },
});
