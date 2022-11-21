import express from "express";
import userRoutes from "./routes/user.routes.js";
const app = express();
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use(express.urlencoded({ extended: true }));
export default app;
