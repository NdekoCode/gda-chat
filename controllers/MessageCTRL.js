import { Types } from "mongoose";
import MessageMDL from "../models/MessageMDL.js";
import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty, isVarEmpty, validForm } from "../utils/validators.js";

/**
 * @description Le controlleur pour les messages
 * - Il ne faut pas oublier que la personne qui envoie le message c'est la personne qui est actuellement connecter donc le (senderId)
 * @author NdekoCode
 * @export
 * @class MessageCTRL
 */
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
        $or: [
          { senderId: Types.ObjectId(req.authUser._id) },
          { receiver: req.authUser._id },
        ],
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
    const senderId = req.authUser._id;
    const receiverId = req.params.id;
    const talkersIds = [senderId, receiverId];

    const bodyRequest = {
      ...req.body,
      receiverId,
      senderId,
      talkersIds,
    };

    const errors = validForm(bodyRequest);
    if (isEmpty(errors)) {
      try {
        const userExist = await UserMDL.findById(receiverId);
        if (!isVarEmpty(userExist)) {
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
  /**
   * @description Permet de recuperer les messages entrer deux personnes uniquement qui ont déjà converser
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @memberof MessageCTRL
   */
  async loadSpecificMessages(req, res) {
    const receiverId = req.params.id;
    const senderId = req.authUser._id;
    const messages = await MessageMDL.find({
      stalkers: {
        $all: [new Types.ObjectId(senderId), new Types.ObjectId(receiverId)],
      },
    });
    if (messages) {
      return res.send(messages);
    }
    return res.send([]);
  }
  async getChatUser(req, res, next) {
    const alert = new Alert(req, res);
    try {
      const senderId = req.authUser._id;
      const receiverId = req.params.id;
      const chatsUsers = await MessageMDL.find({
        $or: [
          {
            talkersIds: [
              new Types.ObjectId(receiverId),
              new Types.ObjectId(senderId),
            ],
          },
          {
            talkersIds: [
              new Types.ObjectId(senderId),
              new Types.ObjectId(receiverId),
            ],
          },
        ],
      });

      return res.send(chatsUsers);
    } catch (error) {
      return alert.danger(error.message);
    }
  }
  /**
   * @description Recupère les messages entre l'utilisateur connecter et l'utilisateur qu'il a choisis pour discuter
   * @author NdekoCode
   * @param {IncommingMessage} req
   * @param {ServerResponse} res
   * @memberof MessageCTRL
   */
  async getMessagesWithAuthUser(req, res) {
    const alert = new Alert(req, res);
    const receiverId = req.params.id;
    const senderId = req.authUser._id;
    const talkersIds = [
      new Types.ObjectId(senderId),
      new Types.ObjectId(receiverId),
    ];
    try {
      const messages = await MessageMDL.find({
        talkersIds: {
          $all: talkersIds,
        },
      });
      return res.send(messages);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
}
