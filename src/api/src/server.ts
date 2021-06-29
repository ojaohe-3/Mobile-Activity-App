import app from "./app";
import { createServer } from "http";

const dotenv = require("dotenv");
dotenv.config();



const server = createServer(app);



export default server;