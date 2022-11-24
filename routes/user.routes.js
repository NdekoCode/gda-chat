import { Router } from "express";
import UserCTRL from "../controllers/UserCTRL.js";
const userCTRL = new UserCTRL();

const userRoutes = Router();
userRoutes.post("/register", userCTRL.register);
userRoutes.post("/login", userCTRL.login);
userRoutes.post("/users", userCTRL.getUsers);
export default userRoutes;
