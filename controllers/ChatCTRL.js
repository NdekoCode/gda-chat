import ChatMDL from "../models/ChatMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty } from "../utils/validators.js";

export default class ChatCTRL {
  async home(req, res, next) {
    const alert = new Alert(req, res);
    try {
      const messages = await ChatMDL.find();
      return res.send(messages);
    } catch (error) {
      return alert.danger("Erreurs lors de la récuperation des messages");
    }
  }
  addMessage(req) {
    const bodyRequest = {
      ...req.body,
      userIdA: req.auth.userId,
      userIdB: req.params.id,
      send_by: req.auth.userId,
    };
    if (!isEmpty(bodyRequest)) {
      const chat = new ChatMDL(bodyRequest);
    }
  }
}
