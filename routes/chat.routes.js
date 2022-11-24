import { Router } from "express";
import ChatCTRL from "../controllers/ChatCTRL.js";
const chatCTRL = new ChatCTRL();
const chatRoutes = Router();

chatRoutes.get("/", chatCTRL.home);
chatRoutes.post("/send/:id", chatCTRL.addMessage);
export default chatRoutes;
