import { Router } from "express";
import UserCTRL from "../controllers/UserCTRL.js";
import auth from "../middlewares/auth.mid.js";
const userCTRL = new UserCTRL();

const userRoutes = Router();
userRoutes.post("/register", userCTRL.register);
userRoutes.post("/login", userCTRL.login);
userRoutes.get("/users", auth, userCTRL.getUsers);
export default userRoutes;
