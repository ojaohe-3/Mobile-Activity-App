import { Router, Request, Response } from "express";
import SessionController from "../handlers/SessionController";
import { createSession, ISession } from "../objects/GameSession";
import IResponse from "./IResponse";
//todo authentication
const sessionAPI = Router();
const handler = SessionController.Instance;

sessionAPI.get("/:id", (req : Request, res : Response) => {
    try {
        const id = req.params.id;
        const item = handler.getSession(id);
        res.json(item);
    } catch (error) {
        const response : IResponse = {
            message : 'Could not find member',
            error : error,
            status : 404
        }
        res.status(404).json(response)
    }
});

sessionAPI.get("/", (req : Request, res : Response) => {
    //todo attribute security, only list for members
    res.json(handler.items().values);
});

sessionAPI.post("/", (req : Request, res : Response) => {
    try {
        const data = req.body as ISession;
        handler.setSession(createSession(data));
        const response : IResponse = {
            message : 'Success! Session created!',
            status : 200,
            data : data,
        }
        res.json(response)
    } catch (error) {
        const response : IResponse = {
            message: "Could not process payload",
            status: 500,
            error: error,
        }
        res.status(500).json(response);
    }
});

sessionAPI.put("/:id", (req : Request, res : Response) => {
    try {
        const data = req.body as ISession;
        handler.update(data);
        const response : IResponse = {
            message : 'Success! Session updated!',
            status : 200,
            data : data,
        }
        res.json(response)
    } catch (error) {
        const response : IResponse = {
            message: "Could not process payload",
            status: 500,
            error: error,
        }
        res.status(500).json(response);
    }
});

export default sessionAPI;