import cors from "cors";
import express from "express";
import { resolve } from "path";
import auth from "./middlewares/auth.mid.js";
import messageRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
import { __dirname } from "./utils/utils.js";
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://gda-chat.netlify.app",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, "public"))); // On configure le dossier qui va contenir nos fichiers static càd CSS/JS/IMAGES
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", auth, messageRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: "URL not Found" });
});
export default app;
