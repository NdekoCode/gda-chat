import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import ChatMDL from "../models/ChatMDL.js";
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
    const alert = new Alert(req, res);
    const errors = {
      ...validForm(req.body),
      ...ValidateEmail(req.body.email),
      ...validPassword(req.body.password),
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
    return alert.danger(errors, 401);
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
          return alert.makeAlert("Vous etes connecter", 200, "success", {
            userData: {
              userId: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              image: user?.image,
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
      const users = await UserMDL.find({ _id: { $ne: req.auth.userId } });
      return res.status(200).send(users);
    } catch (error) {
      return alert.danger(
        "Erreur lors de la recupération des données utilisateurs " +
          error.message,
        500
      );
    }
  }
  async getContacts(req, res, next) {
    const alert = new Alert(req, res);
    try {
      console.log(req.auth.userId);
      const messageUsers = await ChatMDL.find({
        $or: [{ receiver: req.auth.userId }, { sender: req.auth.userId }],
      });
      const contactIds = [
        ...new Set(
          messageUsers.map((data) => {
            if (data.receiver !== req.auth.userId) {
              return data.receiver;
            } else if (data.sender !== req.auth.userId) {
              return data.sender;
            }
          })
        ),
      ];
      if (!isVarEmpty(contactIds)) {
        const users = await UserMDL.find({ _id: { $in: contactIds.users } });
        return res.status(200).send(users);
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
}
