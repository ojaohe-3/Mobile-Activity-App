// import ProgramController from "./handlers/ProgramController";
// ProgramController.instance;

import { createServer } from "http";
import app from "./app";
import { Monitor } from "./handlers/DataMonitor";
import { WebSocketHandler } from "./websocket";

const server = createServer(app);

const dotenv = require("dotenv");
dotenv.config();


const port = process.env.PORT || 5000;
const wss = new WebSocketHandler(server);
Monitor.instance = new Monitor(wss);

server.listen(app.get("port"), () => {
  console.log(`Server Listening on port ${port}`);
});
