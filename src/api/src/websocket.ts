import * as WebSocket from "ws";
import server from "./server";

const wss = new WebSocket.Server({ server }); 
wss.on("connection", (ws) => {
  console.log(new Date().toISOString(), "connection established");

  ws.on("message", (data) => {
    console.log(new Date().toISOString(), data);
  });

  ws.on("close", () => {
    console.log(new Date().toISOString(), "closed connection");
  });
});

export default wss;