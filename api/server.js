import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3500;
const server = createServer(app);
server.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
