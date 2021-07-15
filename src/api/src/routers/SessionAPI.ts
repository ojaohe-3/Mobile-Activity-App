import console, { assert } from "console";
import { Router, Request, Response } from "express";
import SessionController from "../handlers/SessionController";
import { createSession, ISession } from "../models/GameSession";
import IResponse from "../models/response.model";
import mongoose from "mongoose";
//TODO authentication
const sessionAPI = Router();
const handler = SessionController.Instance;

sessionAPI.get("/:id", async (req : Request, res : Response) => {
    try {
        const id = req.params.id;
        const item = await handler.getSession(id);
        res.json(item);
    } catch (error) {
        console.log("error occured!")
        const response : IResponse = {
            message : 'Could not find member',
            error : error,
            status : 404
        }
        res.status(404).json(response)
    }
});
sessionAPI.get("/members/:id/", async (req : Request, res : Response) => {
    try {
        const id = req.params.id;
        const item = await handler.getSession(id);
        res.json(item.members);
    } catch (error) {
        console.log("error occured!")
        const response : IResponse = {
            message : 'Could not find member',
            error : error,
            status : 404
        }
        res.status(404).json(response)
    }
});

sessionAPI.get("/", async (req : Request, res : Response) => {
    //TODO attribute security, only list for members
    res.json(await handler.items());
}); 

sessionAPI.post("/", (req : Request, res : Response) => {
    try {
        console.log(req.body)
        const data = req.body as Omit<ISession, "_id" >;
        const id = mongoose.Types.ObjectId();
        const raw : ISession = {
            ...data,
            _id: id.toString(),
        }
        handler.addSession(createSession(raw));
        const response : IResponse = {
            message : 'Success! Session created!',
            status : 200,
            data : raw,
        }
        res.json(response)
    } catch (error) {
        console.log("error occured!")
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
        const data = req.body as Partial<ISession>;
        const id = req.params.id;
        assert(data.totalSteps && data.current );
        handler.update(id, data.totalSteps!, data.current!);
        const response : IResponse = {
            message : 'Success! Session updated!',
            status : 200,
            data : data,
        }
        res.json(response)
    } catch (error) {
        console.log("error occured!")
        const response : IResponse = {
            message: "Could not process payload",
            status: 500,
            error: error,
        }
        res.status(500).json(response);
    }
});

export default sessionAPI;