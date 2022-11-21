import morgan from "morgan";
import { createWriteStream } from "fs";
import { normalizePort, __dirname } from "../utils/utils.js";
import { join } from "path";
import { createServer } from "http";
const httpConfig = (app) => {
  const PORT = normalizePort(process.env.PORT || 3500);
  app.use(
    morgan("dev", {
      skip: (req, res) => res.status < 400,
    })
  );
  app.use("common", {
    stream: createWriteStream(join(__dirname, "access.log"), { flags: "a" }),
  });
  app.set("port", PORT);
  const server = createServer(app);
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
  server.listen(PORT);
};
export default httpConfig;
