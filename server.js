// TODO: #14 - User upload image
// TODO: #15 Cloudnary for image upload
// TODO: #16 Deployment not found

import dotenv from "dotenv";
import app from "./app.js";
import database from "./config/dbConfig.js";
import httpConfig from "./config/httpConfig.js";
dotenv.config();
database()
  .then(() => {
    httpConfig(app);
    // Promise.resolve(userFakeData());
  })
  .catch((err) => {
    console.log("Connection to the database failed", err.message);
  });
