import app from "./app";
import { createServer } from "http";

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;
app.set("port", port);


const server = createServer(app);



export default server;