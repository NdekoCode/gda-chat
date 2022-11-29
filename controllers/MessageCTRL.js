import MessageMDL from "../models/MessageMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty, validForm } from "../utils/validators.js";

export default class MessageCTRL {
  async home(req, res, next) {
    const alert = new Alert(req, res);
    try {
      const messages = await MessageMDL.find({
        $or: [{ sender: req.auth.userId }, { receiver: req.auth.userId }],
      });
      if (messages !== null) {
        return res.send(messages);
      }
      return res.send([messages]);
    } catch (error) {
      return alert.danger("Erreurs lors de la récuperation des messages");
    }
  }
  async addMessage(req, res) {
    const alert = new Alert(req, res);
    const bodyRequest = {
      ...req.body,
      receiver: req.params.id,
      sender: req.auth.userId,
    };
    const errors = validForm(bodyRequest);
    console.log(bodyRequest, errors);
    if (isEmpty(errors)) {
      try {
        const chat = new MessageMDL(bodyRequest);
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
    const userConnectedId = req.auth.userId;
    try {
      console.log(userId);
      const chatsUsers = await MessageMDL.find({
        $or: [
          {
            $and: [{ receiver: userId }, { sender: userConnectedId }],
          },
          {
            $and: [{ sender: userId }, { receiver: userConnectedId }],
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
