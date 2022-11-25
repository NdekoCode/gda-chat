// TODO: #4 - Chat Message

// TODO: #5 - Private Message

// TODO: #6 - Room message

// TODO: #7 - User online

// TODO: #8 - User disconnect

// TODO: #9 - User writing or typing

// TODO: #12 - Send Message
// TODO: #11 - Receive Message
// TODO: #10 - User Online
// TODO: #13 - User Profile
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
    // Promise.resolve(userFakeContact());
  })
  .catch((err) => {
    console.log("Connection to the database failed", err.message);
  });
