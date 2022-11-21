import dotenv from "dotenv";
import database from "./config/dbConfig.js";
dotenv.config();
const PORT = process.env.PORT || 3500;
const server = createServer(app);
database()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running at " + PORT);
    });
  })
  .catch((err) => {
    console.log("Connection to the database failed", err.message);
  });
