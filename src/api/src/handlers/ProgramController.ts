import { Application } from "express";
import { createServer, Server } from "http";
import { WebSocketHandler } from "../websocket";
import app from "../app"

export default class ProgramController{
    private static _instance? : ProgramController
    private _wss : WebSocketHandler
    private _app : Application
    private _server : Server


    public static get instance(): ProgramController {
        if(!this._instance)
            this._instance = new ProgramController();
        return this._instance;
    }

    constructor(){
        this._app = app;
        this._server = createServer(app);

        const dotenv = require("dotenv");
        dotenv.config();

        const port = process.env.PORT || 5000;
        this._wss = new WebSocketHandler(this._server);
        
        this._server.listen(app.get("port"), () => {
        console.log(`Server Listening on port ${port}`);
        });


    }

}