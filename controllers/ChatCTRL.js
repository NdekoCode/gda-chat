import ChatMDL from "../models/ChatMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty, validForm } from "../utils/validators.js";

export default class ChatCTRL {
  async home(req, res, next) {
    const alert = new Alert(req, res);
    try {
      const messages = await ChatMDL.find({
        $or: [
          { userIdA: req.auth.userId },
          { userIdB: req.auth.userId },
          { send_by: req.auth.userId },
        ],
      });
      return res.send(messages);
    } catch (error) {
      return alert.danger("Erreurs lors de la récuperation des messages");
    }
  }
  async addMessage(req) {
    const alert = new Alert(req, res);
    const dataForm = { ...req.body, userIdB: req.params.id };
    const errors = validForm(dataForm);
    if (isEmpty(errors)) {
      try {
        const bodyRequest = {
          ...dataForm,
          userIdA: req.auth.userId,
        };
        const chat = new ChatMDL(bodyRequest);
        await chat.save();
        return alert.success("Messages ajouter avec succès");
      } catch (error) {
        return alert.danger(
          "Erreur survenus lors de l'envois du message " + error.message
        );
      }
    }

    return alert.danger(errors);
  }
  async getChatUser(req, res, next) {
    const alert = new Alert(req, res);
    const userId = req.params.id;
    try {
      console.log(userId);
      const chatsUsers = await ChatMDL.find({
        $and: [
          {
            $or: [{ userIdA: userId }, { userIdB: req.auth.userId }],
          },
          {
            $or: [{ userIdB: userId }, { userIdA: req.auth.userId }],
          },
        ],
      });

      console.log(chatsUsers);
      return res.send(chatsUsers);
    } catch (error) {
      return alert.danger(error.message);
    }
  }
}
