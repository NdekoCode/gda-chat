import { Router } from "express";
import UserCTRL from "../controllers/UserCTRL.js";
const userCTRL = new UserCTRL();

const userRoutes = Router();
userRoutes.post("/register", userCTRL.signup);
userRoutes.post("/login", userCTRL.login);
export default userRoutes;
