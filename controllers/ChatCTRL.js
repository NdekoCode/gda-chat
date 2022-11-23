import ChatMDL from "../models/ChatMDL.js";
import { isEmpty } from "../utils/validators.js";

export default class ChatCTRL {
  async home(req, res, next) {
    const messages = await ChatMDL.find();
    return messages;
  }
  addMessage(req) {
    const bodyRequest = { ...req.body };
    if (isEmpty(bodyRequest)) {
    }
  }
}
