import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import organizationAPI from "./routers/OrganizationAPI";
import profileAPI from "./routers/ProfileAPI";
import sessionAPI from "./routers/SessionAPI";
import dataAPI from "./routers/DataAPI";

const dotenv = require("dotenv");
dotenv.config();

declare interface ResponseError extends Error {
  status?: number
}

const app : Application = express();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.API_URL || 'localhost',
  preflightContinue: false,
}

app.use(cors(options));


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))



const logger = (req : Request, res: Response, next : NextFunction) => {
  console.log(
    `${(new Date()).toISOString()} :${req.protocol}://${req.get("host")}${req.originalUrl}: got  ${req.method}`
  );
  next();
};
app.use(logger);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.set('Content-Type', 'application/json')
  next()
})

app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.status || 500);
    res.send("Error Occured!\nPlease try again later");
  })

app.use('/api/v1/profile/', profileAPI);
app.use('/api/v1/organization/', organizationAPI);
app.use('/api/v1/session/', sessionAPI);
app.use('/api/v1/data', dataAPI);
//TODO add a statistics api to get statistics from specific sessions and total from all sessions

const port = process.env.PORT || 5000;
app.set("port", port);

export default app;