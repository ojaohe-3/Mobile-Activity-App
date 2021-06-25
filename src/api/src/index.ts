import app from "./app";
import server from "./server";

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;

server.listen(app.get("port"), () => {
  console.log(`Server Listening on port ${port}`);
});

