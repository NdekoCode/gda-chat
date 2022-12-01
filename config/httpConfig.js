import { createWriteStream } from "fs";
import { createServer } from "http";
import morgan from "morgan";
import { join } from "path";
import { normalizePort, __dirname } from "../utils/utils.js";
import { isVarEmpty } from "../utils/validators.js";
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
    socket.on("join_conversation", (users) => {
      // Si je suis connecter au tout debut je vais rejoindre mon propre salon mais quand je vais cliquer sur un utilisateur je vais plutot rejoindre sa salle à lui
      socket.join(users.userInterlocutorId);
      console.log("New user", users.userInterlocutor);
      socket.userConnectId = users.userConnectId;
      socket.emit("new_user", socket.userConnectId);
      if (!isVarEmpty(users.userInterlocutorId)) {
        console.log("new user", users.userInterlocutor);
        io.in(users.userInterlocutorId).emit(
          "user_contact",
          users.userInterlocutor
        );
      }
    });

    socket.on("user_writing", (data) => {
      socket.to(data.receiverUser._id).emit("typing", {
        senderUser: data.senderUser,
        receiverUser: data.receiverUser,
      });
    });

    // On détecte quand un message à été envoyer
    socket.on("send_message", (data) => {
      console.log("Message send", data);
      // On envois un evenement à la personne à qui on a envoyer le message
      socket.in(data.dataSend.receiverId).emit("received_message", data);
    });
    socket.on("logout_user", (user) => {
      socket.leave(user.userId);
      console.log(user.firstName + " est déconnecter ");
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
