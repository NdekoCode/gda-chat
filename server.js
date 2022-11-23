// TODO: #4 - Chat Message

// TODO: #5 - Private Message

// TODO: #6 - Room message

// TODO: #7 - User online

// TODO: #8 - User disconnect

// TODO: #9 - User writing or typing

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
