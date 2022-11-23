import { Router } from "express";
import ChatCTRL from "../controllers/ChatCTRL.js";
const chatCTRL = new ChatCTRL();
const chatRoutes = Router();

chatRoutes.get("/", /* auth ,*/ chatCTRL.home);
export default chatRoutes;
