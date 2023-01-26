import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();
let dbURL;
if (process.env.NODE_ENV !== "test") {
  dbURL = process.env.DB_URL;
} else {
  dbURL = process.env.DB_URL_TEST;
}
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default function database() {
  return connect(dbURL, connectionParams)
    .then(() => {
      console.log("Connexion à MongoDB reussie");
    })
    .catch((err) => {
      console.log("La connexion à echouer ", err.message);
    });
}
