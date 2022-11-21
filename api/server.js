// TODO: - Chat Message
// TODO: - Private Message
// TODO: - Room message
// TODO: - User online
// TODO: - User disconnect
// TODO: - User writing or typing
import dotenv from "dotenv";
import app from "./app.js";
import database from "./config/dbConfig.js";
import httpConfig from "./config/httpConfig.js";
dotenv.config();
database()
  .then(() => {
    httpConfig(app);
  })
  .catch((err) => {
    console.log("Connection to the database failed", err.message);
  });
