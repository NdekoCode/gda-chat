import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Alert from "../utils/Alert.js";
dotenv.config();

export default async function auth(req, res, next) {
  const alert = new Alert(req, res);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_WORD);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    return alert.danger(error.message, 401);
  }
}
