import { hash } from "bcrypt";
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
    const password = await hash("7288pat", 12);
    const newUserInput1 = {
      firstName: "Gloire",
      lastName: "Mutaliko",
      username: "Gola gola",
      email: "mutaliko@gmail.com",
      image: "https://loremflickr.com/g/500/320/user,man?lock=1",
      password,
    };
    const newUser1 = new UserMDL(newUserInput1);
    await newUser1.save();
    console.log("User insert");
    const newUserInput2 = {
      firstName: "Cedric",
      lastName: "Karungu",
      username: "Vb",
      email: "ckarungu@gmail.com",
      image: "https://loremflickr.com/g/500/320/user,man?lock=3",
      password,
    };
    const newUser2 = new UserMDL(newUserInput2);
    await newUser2.save();
    console.log("User insert");
    const newUserInput3 = {
      firstName: "Arick",
      lastName: "Bulakali",
      username: "ndekocode",
      email: "arickbulakali@ndekocode.com",
      image: "https://loremflickr.com/g/500/320/user,man?lock=5",
      password,
    };
    const newUser3 = new UserMDL(newUserInput3);
    await newUser3.save();
    console.log("User insert");
    for (let userData of usersData) {
      const userInput = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        image: userData.image,
        password,
      };
      const user = new UserMDL(userInput);
      await user.save();
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
        receiver: users[parseInt(Math.random() * users.length)]._id,
        sender: users[parseInt(Math.random() * users.length)]._id,
        message: element.quote,
      };
      const chat = new ChatMDL(msg);
      await chat.save();
      console.log("Message insert");
    }
  } catch (error) {
    console.log("Failed to load users ", error.message);
  }
}
/* export async function userFakeContact() {
  try {
    const users = await UserMDL.find();
    const contactData = [];
    let item = 0;
    for (let user of users) {
      contactData.push(user._id);
      item++;
      if (item === 10) {
        const contact = new ContactMDL({
          users: contactData,
          userId: users[parseInt(Math.random() * 11) + 90]._id,
        });
        await contact.save();
        contactData.length = 0;
        item = 0;
        console.log("Contact add ...");
        continue;
      }
    }
  } catch (error) {
    console.log("Failed to add contact users ", error.message);
  }
} */
