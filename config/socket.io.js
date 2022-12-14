import { Server } from "socket.io";
import { isVarEmpty } from "../utils/validators.js";
let io;
const IO = {
  /**
   * @description
   * @author NdekoCode
   * @param {Server<Request, Response>} server
   * @return {Server}
   */
  init: (server) => {
    if (isVarEmpty(io)) {
      io = new Server(server, {
        cors: {
          origin: [
            "http://localhost:5173",
            "https://gda-chat.netlify.app",
            "http://localhost:5174",
          ],
        },
      });
    }
    return io;
  },
  /**
   *
   * @returns {Server}
   */
  getIO: () => {
    if (!io) {
      throw new Error("Socket is not initialized ");
    }
    return io;
  },
};
export default IO;
