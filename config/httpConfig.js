import { createWriteStream } from "fs";
import { createServer } from "http";
import morgan from "morgan";
import { join } from "path";
import { Server } from "socket.io";
import ChatMDL from "../models/ChatMDL.js";
import { normalizePort, __dirname } from "../utils/utils.js";
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
  const server = createServer(app);

  // IO
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://gda-chat.netlify.app",
        "http://localhost:5174",
      ],
    },
  });
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
      try {
        const messages = await ChatMDL.find({
          $or: [
            {
              $and: [
                { userIdA: { $eq: users.userInterlocutorId } },
                { userIdB: { $eq: users.userConnectId } },
              ],
            },
            {
              $and: [
                { userIdB: { $eq: users.userInterlocutorId } },
                { userIdA: { $eq: users.userConnectId } },
              ],
            },
          ],
        });
        socket.emit("load_messages", { messages: JSON.stringify(messages) });
      } catch (error) {
        console.log(
          "error lors de la récupération des messages " + error.message
        );
      }
    });
    socket.on("user_connected", (user) => {
      console.log("new user connected " + user.firstName);
      socket.join(user.userId);
    });
    socket.on("user_writing", (user) => {
      console.log(user.firstName + " EST ENTRER D'ECRIRE ", user._id);
    });
    socket.on("user_connected", (user) => {
      console.log(user.firstName + " est connected ", user.userId);
    });
    socket.on("send_message", (data) => {
      console.log("Message reçus..." + data.message);
      socket.to(data.userIdB).emit("received_message", data);
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
