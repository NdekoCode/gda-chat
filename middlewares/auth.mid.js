import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
dotenv.config();

export default async function auth(req, res, next) {
  const alert = new Alert(req, res);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_WORD);
    const userId = decodedToken.userId;
    const user = await UserMDL.findById(userId);
    req.authUser = new UserMDL(user);
    next();
  } catch (error) {
    if (process.env.ENVIRONNEMENT === "DEVELOPMENT") {
      return alert.danger(
        `Vous devez etre connecter pour acceder à cette page ${error.message} ${error.stack}`,
        401
      );
    }
    return alert.danger(
      `Vous devez etre connecter pour acceder à cette page`,
      401
    );
  }
}
