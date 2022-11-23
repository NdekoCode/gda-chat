import { readFile } from "fs/promises";
import { join } from "path";
import ChatMDL from "../models/ChatMDL.js";
import UserMDL from "../models/UserMDL.js";
import { __dirname } from "./utils.js";

export async function userFakeData() {
  const userDataFile = await readFile(join(__dirname, "data", "users.json"), {
    encoding: "utf8",
  });
  const usersData = JSON.parse(userDataFile);
  if (usersData.length > 0) {
    for (let userData of usersData) {
      const userInput = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        image: userData.image,
        password: userData.password,
      };
      const user = new UserMDL(userInput);
      user.save();
      console.log("User insert");
    }
  }
}
export async function userFakeMessage() {
  try {
    const users = await UserMDL.find();
    const messageDataFile = await readFile(
      join(__dirname, "data", "quotes.json"),
      {
        encoding: "utf8",
      }
    );
    const msgData = JSON.parse(messageDataFile);
    for (const element of msgData) {
      const msg = {
        userIdA: users[parseInt(Math.random() * users.length)]._id,
        userIdB: users[parseInt(Math.random() * users.length)]._id,
        message: element.quote,
        sent_by: users[parseInt(Math.random() * users.length)]._id,
      };
      const chat = new ChatMDL(msg);
      chat.save();
      console.log("Message insert");
    }
  } catch (error) {
    console.log("Failed to load users ", error.message);
  }
}
