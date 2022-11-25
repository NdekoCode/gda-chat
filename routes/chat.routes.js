import { Router } from "express";
import ChatCTRL from "../controllers/ChatCTRL.js";
const chatCTRL = new ChatCTRL();
const chatRoutes = Router();

chatRoutes.get("/", chatCTRL.home);
chatRoutes.post("/send/:id", chatCTRL.addMessage);
chatRoutes.get("/user/:id", chatCTRL.getChatUser);
export default chatRoutes;
