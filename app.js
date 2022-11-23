import express from "express";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();
app.use(express.json());
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use(express.urlencoded({ extended: true }));
export default app;
