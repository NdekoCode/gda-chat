import { Router } from "express";
import MessageCTRL from "../controllers/MessageCTRL.js";
const messageCTRL = new MessageCTRL();
const messageRoutes = Router();

messageRoutes.get("/", messageCTRL.home);
messageRoutes.post("/send/:id", messageCTRL.addMessage);
messageRoutes.get("/user/:id", messageCTRL.getChatUser);
export default messageRoutes;
