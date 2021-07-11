import { Router, Request, Response } from "express";
import UserSessions from "../handlers/UserSessions";
import Profile, { createProfile, IProfile } from "../models/Profile";
import mongoose from "mongoose";
import IResponse from "../models/response.model";

const profileAPI = Router();
const handler = UserSessions.Instance;


profileAPI.get("/:id", (req : Request, res : Response) => {
    const id = req.params.id;
    try {
        res.json(handler.getUser(id));
    } catch (error) {
        const response : IResponse = {
            message: "could not find member with id: " + id,
            error: error,
            status: 404
        }
        res.status(404).json(response);
    }
});

//TODO remove, this is only for debuging
profileAPI.get("/", (req : Request, res : Response) => {
    res.json(handler.activeUsers.values());
});

profileAPI.post("/", async (req : Request, res : Response) => {
    try {
        const data = req.body as Partial<IProfile>
        const name = data.name!
        let oid = ""
        if(data.oid) oid = data.oid
        else {
            const def = await handler.defaultOid();
            oid = def!;         
        }

        UserSessions.Instance.addUser(createProfile({name : name, oid : oid, id: data.id ? data.id : ""}));
        const response : IResponse = {
            message: "Success! user added!",
            data: data,
            status: 200
        }
        res.json(response)
    } catch (error) {
        const response : IResponse = {
            message: "Error, could not process data",
            error: error,
            status: 500
        }
        res.status(500).json(response)
    }
});
profileAPI.put("/:id", (req : Request, res : Response) => {
    try {
        const id = req.params.id
        const data = req.body as IProfile
        UserSessions.Instance.replaceUser(id, createProfile(data))
        const response : IResponse = {
            message: "Success! user added!",
            data: data,
            status: 200
        }
        res.json(response)
    } catch (error) {
        const response : IResponse = {
            message: "Error, could not process data",
            error: error,
            status: 500
        }
        res.status(500).json(response)
    }
});

export default profileAPI;