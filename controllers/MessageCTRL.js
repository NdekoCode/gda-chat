import MessageMDL from "../models/MessageMDL.js";
import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty, validForm } from "../utils/validators.js";

export default class MessageCTRL {
  /**
   *
   * @description Récupère tous les messages que l'utilisateurs connecter à déjà envoyer ou qu'il a déjà recus
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @return {array<object>}
   * @memberof MessageCTRL
   */
  async home(req, res) {
    const alert = new Alert(req, res);
    try {
      const messages = await MessageMDL.find({
        $or: [{ senderId: req.auth.userId }, { receiver: req.auth.userId }],
      });
      if (messages !== null) {
        return res.send(messages);
      }
      return res.send([messages]);
    } catch (error) {
      return alert.danger("Erreurs lors de la récuperation des messages");
    }
  }
  /**
   * @description Ajoute un message dans la base de donnée
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @return {void}
   * @memberof MessageCTRL
   */
  async addMessage(req, res) {
    const alert = new Alert(req, res);
    const senderId = req.auth.userId;
    const receiverId = req.params.id;
    const talkersIds = [senderId, receiverId];
    const bodyRequest = {
      ...req.body,
      receiverId,
      senderId,
      talkersIds,
    };
    const errors = validForm(bodyRequest);
    console.log(bodyRequest, errors);
    if (isEmpty(errors)) {
      try {
        const userExist = await UserMDL.findById(receiverId);
        if (userExist !== null) {
          const chat = new MessageMDL(bodyRequest);
          await chat.save();
          return alert.success("Messages ajouter avec succès");
        }

        return alert.danger(
          "L'utilisateur à qui vous voulez envoyer le message n'existe pas",
          404
        );
      } catch (error) {
        return alert.danger(
          "Erreur survenus lors de l'envois du message " + error.message
        );
      }
    }

    return alert.danger(errors["error"]);
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
