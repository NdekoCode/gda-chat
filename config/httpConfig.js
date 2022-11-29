import { createWriteStream } from "fs";
import { createServer } from "http";
import morgan from "morgan";
import { join } from "path";
import ChatMDL from "../models/ChatMDL.js";
import { normalizePort, __dirname } from "../utils/utils.js";
import IO from "./socket.io.js";
const httpConfig = (app) => {
  const PORT = normalizePort(process.env.PORT || 3500);
  app.use(
    morgan("dev", {
      skip: (req, res) => res.status < 400,
    })
  );
  app.use(
    morgan("common", {
      stream: createWriteStream(join(__dirname, "access.log"), { flags: "a" }),
    })
  );
  app.set("port", PORT);
  /** @type {Server<Request, Response>} */
  const server = createServer(app);

  // IO
  const io = IO.init(server);
  // FIXED : Se connecter au socket, on detecte quand un utilisateur se connecter
  io.on("connection", (socket) => {
    console.log("Socket connection is initialized in backend");
    socket.on("disconnect", () => {
      console.log(" User disconnected");
    });
    // Un utilisateur vient de rejoindre le salon
    socket.on("join_user", async (users) => {
      socket.userConnectId = users.userConnectId;
      socket.join(users.userConnectId);
      if (users.userInterlocutor) {
        console.log("new user", users.userInterlocutor);
        socket
          .in(users.userInterlocutor._id)
          .emit("user_contact", users.userInterlocutor);
      }
      try {
        const messages = await ChatMDL.find({
          $or: [
            {
              $and: [
                { sender: { $eq: users.userInterlocutorId } },
                { receiver: { $eq: users.userConnectId } },
              ],
            },
            {
              $and: [
                { receiver: { $eq: users.userInterlocutorId } },
                { sender: { $eq: users.userConnectId } },
              ],
            },
          ],
        });
        socket.emit("load_messages", JSON.stringify(messages));
      } catch (error) {
        console.log(
          "error lors de la récupération des messages " + error.message
        );
      }
    });
    socket.on("user_connected", (user) => {
      console.log(user.firstName + " est connected ", user.userId);
      socket.broadcast.emit("new_user", user);
    });
    socket.on("user_writing", (data) => {
      socket.to(data.toSend._id).emit("typing", {
        isWriting: data.isWriting,
        writeTo: data.toSend,
      });
    });
    socket.on("send_message", async (data) => {
      console.log("Message reçus..." + JSON.stringify(data));
      try {
        const chat = new ChatMDL(data.dataSend);
        await chat.save();
        console.log(data.dataSend.receiver);
        socket.in(data.dataSend.receiver).emit("received_message", data);
      } catch (error) {
        console.log(
          "Erreur survenus lors de l'envois du message " + error.message
        );
      }
    });
    // Detecter quand un utilisateur se connecte ou se deconnecte
  });
  const handleError = (err) => {
    if (err.syscall === "listen") throw err;
    const address = server.address();
    const bind =
      typeof address === "string" ? "pipe " + address : "port: " + PORT;
    switch (err.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw err;
    }
  };

  server.on("error", handleError);
  server.on("listening", () => {
    const address = server.address();
    const bind =
      typeof address === "string" ? "pipe " + address : "port: " + PORT;
    console.log("Listening on " + bind);
  });
  server.listen(PORT, () => {
    console.log("Server is listening at " + PORT);
  });
};
export default httpConfig;
