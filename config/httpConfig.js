import { createWriteStream } from "fs";
import { createServer } from "http";
import morgan from "morgan";
import { join } from "path";
import { Server } from "socket.io";
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
  const io = new Server(server);
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
  // FIXED : Se connecter au socket, on detecte quand un utilisateur se connecter
  io.on("connection", (socket) => {
    console.log("Socket connection is initialized in backend");
    socket.on("disconnect", () => {
      console.log(" User disconnected");
      socket.broadcast.emit("leaveUser", socket.pseudo);
    });
    // Detecter quand un utilisateur se connecte ou se deconnecte
    socket.on("enter_pseudo", (pseudo) => {
      // On dit que la socket de mon utilisateur va avoir un s
      socket.pseudo = pseudo;
      // FIXED: On emet que on a un utilisateur qui vient de se connecter
      socket.broadcast.emit("newUser", pseudo);
    });
  });
  server.listen(PORT, () => {
    console.log("Server is listening at " + PORT);
  });
};
export default httpConfig;
