import { compare, hash } from "bcrypt";
import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
import {
  isEmpty,
  isEmptyObject,
  ValidateEmail,
  validPassword,
} from "../utils/validators.js";
/**
 * @description Va contenir les differentes fonctions qui vont interagir avec l'application concernant le traitement des Utilisateur et la route "/api/v1/auth"
 * @author NdekoCode
 * @class UserController
 */
export default class UserCTRL {
  /**
   * @description Pour l'enregistrement des nouveaux utilisateurs
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   * @memberof UserCTRL
   */
  async signup(req, res, next) {
    const alert = new Alert(req, res);
    const errors = {
      ...ValidateEmail(req.body.email),
      ...validPassword(req.body.password),
    };
    // Si l'objet des erreurs est vide alors il n'y a pas d'erreur dans notre requete
    if (isEmptyObject(errors)) {
      // Cette methode prend deux argument, la chaine que l'on veut crypter et combien de fois on souhaite le crypter
      // On crypt notre mot de passe, une fois qu'il est crypter on enregistrer l'utilisateur
      return hash(req.body.password, 14)
        .then((password) => {
          const user = new userModel({
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
              .catch(() =>
                alert.danger(
                  "Erreur lors de l'enregistrement de l'utilisateur",
                  400
                )
              );
          });
        })
        .catch(() =>
          alert.danger("Erreur lors de l'enregistrement de l'utilisateur", 500)
        );
    }
    return alert.danger(errors, 400);
  }
  /**
   * @description Pour connecter des utilisateurs existants
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Function} next
   * @memberof UserCTRL
   */
  login(req, res, next) {
    const alert = new Alert(req, res);
    if (!isEmpty(req.body)) {
      const errors = {
        ...ValidateEmail(req.body.email),
        ...validPassword(req.body.password),
      };
      if (isEmptyObject(errors)) {
        return UserMDL.findOne({ email: req.body.email })
          .then((user) => {
            // On verifie si l'utilisateur a été trouver
            if (isEmpty(user)) {
              // Si l'utilisateur n'a pas été trouver on envois une reponse 401
              return alert.danger("Email ou mot de passe incorrect", 401);
            }
            // L'utilisateur veut se connecter en meme temps on essaie de vefifier son identité en comporant si le mot de passe qu'il entrer est issue du meme mot de passe qui se trouve dans la base de donnée
            compare(req.body.password, user.password)
              .then((valid) => {
                // On verifie si il y a une erreur d'authentification
                if (!valid) {
                  // L'utilisateur n'existe pas alors on envois une erreur arbitraire
                  return alert.danger("Email ou mot de passe incorrect");
                }
                // L'utilisateur existe on envois alors son ID et un token d'authentification que l'on va generer par le serveur et le front se servira de l'utiliser à chaque requete de l'utilisateur et pour cela on va utiliser le package jsonWebTOKEN
                return alert.makeAlert("Vous etes connecter", 200, "success", {
                  userId: user._id,
                  token: jwt.sign({ userId: user._id }, "NDEKOCODE_RANDOM", {
                    expiresIn: "24h",
                  }),
                });
              })
              .catch((error) =>
                alert.danger(
                  "Erreur survenus lors de la connexion de l'utilisateur",
                  500
                )
              );
          })
          .catch(() => alert.danger("Email ou mot de passe incorrect", 500));
      }

      return alert.danger("Email ou mot de passe invalide");
    }
    return alert.danger("Entrer des informations valides");
  }
}
