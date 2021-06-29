import { Router, Request, Response } from "express";
import UserSessions from "../handlers/UserSessions";
import Profile, { createProfile, IProfile } from "../objects/Profile";
import IResponse from "./IResponse";

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

//todo remove, this is only for debuging
profileAPI.get("/", (req : Request, res : Response) => {
    res.json(handler.activeUsers.values());
});

profileAPI.post("/", (req : Request, res : Response) => {
    try {
        const data = req.body as IProfile
        UserSessions.Instance.addActiveUser(createProfile(data))
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
profileAPI.put("/", (req : Request, res : Response) => {

});

export default profileAPI;