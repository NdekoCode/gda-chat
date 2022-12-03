import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import IO from "../config/socket.io.js";
import MessageMDL from "../models/MessageMDL.js";
import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
import {
  isEmpty,
  isEmptyObject,
  isValidUserFields,
  isVarEmpty,
  ValidateEmail,
  validForm,
  validPassword,
} from "../utils/validators.js";
/**
 * @description Va contenir les differentes fonctions qui vont interagir avec l'application concernant le traitement des Utilisateur et la route "/api/v1/auth"
 * @author NdekoCode
 * @class UserCTRL
 */
export default class UserCTRL {
  static defaultHash = 12;
  static userFields = [
    "firstName",
    "lastName",
    "email",
    "password",
    "username",
  ];
  /**
   * @description Pour l'enregistrement des nouveaux utilisateurs
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   * @memberof UserCTRL
   */
  async register(req, res, next) {
    UserCTRL.userFields.push("confpassword");
    const alert = new Alert(req, res);

    const errors = {
      ...validForm(req.body),
      ...ValidateEmail(req.body.email),
      ...validPassword(req.body.password, req.body.confpassword),
    };

    // Si l'objet des erreurs est vide et que on a des champs valide alors il n'y a pas d'erreur dans notre requete
    if (
      isEmptyObject(errors) &&
      isValidUserFields(req.body, UserCTRL.userFields)
    ) {
      try {
        // Cette methode prend deux argument, la chaine que l'on veut crypter et combien de fois on souhaite le crypter
        // On crypt notre mot de passe, une fois qu'il est crypter on enregistrer l'utilisateur
        const password = await hash(req.body.password, UserCTRL.defaultHash);

        const user = new UserMDL({
          ...req.body,
          email: req.body.email,
          password,
        });

        // On verifie si l'utilisateur existe pour eviter la duplication des données
        return UserMDL.exists({ email: req.body.email }, (err, result) => {
          if (err) return err;

          if (result)
            return alert.danger(
              "Cet email est déja pris, veuillez vous connecter avec un autre e-mail",
              309
            );

          // Si l'utilisateur n'existe pas alors on l'ajoute dans notre base de donnée
          return user
            .save()
            .then(() => alert.success("Utilisateur créer avec succées"))
            .catch((error) =>
              alert.danger(
                "Erreur lors de l'enregistrement de l'utilisateur" +
                  error.message,
                500
              )
            );
        });
      } catch (error) {
        return alert.danger(
          "Erreur lors de l'enregistrement de l'utilisateur " + error.message,
          500
        );
      }
    }
    return alert.danger(errors["error"], 401);
  }
  /**
   * @description Pour connecter des utilisateurs existants
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   * @memberof UserCTRL
   */
  async login(req, res, next) {
    const alert = new Alert(req, res);

    if (!isEmpty(req.body)) {
      const errors = {
        ...ValidateEmail(req.body.email),
        ...validPassword(req.body.password),
      };

      if (isEmptyObject(errors)) {
        try {
          const user = await UserMDL.findOne({ email: req.body.email });

          // On verifie si l'utilisateur a été trouver
          if (isVarEmpty(user)) {
            // Si l'utilisateur n'a pas été trouver on envois une reponse 401
            return alert.danger("Email ou mot de passe incorrect", 401);
          }

          // L'utilisateur veut se connecter en meme temps on essaie de vefifier son identité en comporant si le mot de passe qu'il entrer est issue du meme mot de passe qui se trouve dans la base de donnée
          const valid = await compare(req.body.password, user.password);

          // On verifie si il y a une erreur d'authentification
          if (!valid) {
            // L'utilisateur n'existe pas alors on envois une erreur arbitraire
            return alert.danger("Email ou mot de passe incorrect");
          }
          // L'utilisateur existe on envois alors son ID et un token d'authentification que l'on va generer par le serveur et le front se servira de l'utiliser à chaque requete de l'utilisateur et pour cela on va utiliser le package jsonWebTOKEN
          const userConnected = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            image: user?.image,
          };
          const socket = IO.getIO();
          socket.emit("user_login", userConnected);
          console.log("Vient de rejoindre", userConnected);
          return alert.makeAlert("Vous etes connecter", 200, "success", {
            userData: {
              ...userConnected,
              // Le token va contenir uniquement l'id de l'utilisateur connecter
              token: jwt.sign({ userId: user._id }, process.env.SECRET_WORD, {
                expiresIn: "24h",
              }),
            },
          });
        } catch (error) {
          return alert.danger(
            "Erreur survenus lors de la connexion de l'utilisateur " +
              error.stack,
            500
          );
        }
      }

      return alert.danger("Email ou mot de passe invalide", 401);
    }
    return alert.danger("Entrer des informations valides", 401);
  }
  async getUsers(req, res, next) {
    const alert = new Alert(req, res);
    try {
      const users = await UserMDL.find({ _id: { $ne: req.authUser._id } }, [
        "_id",
        "firstName",
        "lastName",
        "username",
        "image",
        "email",
      ])
        .sort({ createdAt: -1 })
        .exec();
      return res.status(200).send(users);
    } catch (error) {
      return alert.danger(
        "Erreur lors de la recupération des données utilisateurs " +
          error.message,
        500
      );
    }
  }
  /**
   * @description Récupere tous les utilisateurs qui ont déjà communiquer et les renvois à l'utilisateur
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @return {array<object>} La liste des utilisateurs considerer comme contact
   * @memberof UserCTRL
   */
  async getContacts(req, res) {
    const alert = new Alert(req, res);
    try {
      const messageUsers = await MessageMDL.find({
        $or: [{ receiverId: req.authUser._id }, { senderId: req.authUser._id }],
      })
        .sort({ createdAt: -1 })
        .exec();
      if (!isVarEmpty(messageUsers)) {
        let contactIds = [
          ...new Set(
            messageUsers.map(({ senderId, receiverId }) => {
              if (senderId.toString() !== req.authUser._id.toString()) {
                return senderId.toString();
              } else if (
                receiverId.toString() !== req.authUser._id.toString()
              ) {
                return receiverId.toString();
              }
            })
          ),
        ];
        if (!isVarEmpty(contactIds)) {
          const users = await UserMDL.find({ _id: { $in: contactIds } }, [
            "_id",
            "firstName",
            "lastName",
            "username",
            "image",
            "email",
          ])
            .sort({ createdAt: -1 })
            .exec();
          return res.status(200).send(users);
        }
        return alert.infos([
          "Vous n'avez pas de contact disponible, veuillez en ajouter",
        ]);
      }
      return alert.infos(
        "Vous n'avez pas de contact disponible, veuillez en ajouter"
      );
    } catch (error) {
      return alert.danger(
        "Erreur lors de la recupération des données utilisateurs " +
          error.message,
        500
      );
    }
  }
  async updateUser(req, res) {
    const alert = new Alert(req, res);
    if (!isEmpty(req.body)) {
      const bodyRequest = { ...req.body };
      delete bodyRequest._id;
      delete bodyRequest.userId;
      const errors = validForm(bodyRequest);

      try {
        if (isEmptyObject(errors)) {
          const id = req.params.id;
          await UserMDL.findOneAndUpdate({ _id: id }, bodyRequest);

          return alert.success(
            "Utilisateur modifier entrer des informations valides"
          );
        }
        return alert.danger(errors["error"]);
      } catch (error) {
        return alert.danger("Error lors de la modification de l'utilisateur");
      }
    }
    return alert.danger("Veuillez entrer des informations valides");
  }
}
