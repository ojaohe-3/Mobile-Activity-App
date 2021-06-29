import { Router, Request, Response } from "express";
import OrgHandler from "../handlers/OrgHandler";
import Organization, { createOrganization, IOrg } from "../objects/Organization";
import Profile, { createProfile, IProfile } from "../objects/Profile";
import IResponse from "./IResponse";

const organizationAPI = Router();
const handler = OrgHandler.Instance;


organizationAPI.get("/:id", (req : Request, res : Response) => {
    const id = req.params.id;
    try {
        res.json(handler.getOrg(id))
    } catch (error) {
        const response : IResponse = {
            message : 'Error, no such id',
            error : error,
            status : 404
        }
        res.status(404).json(response)
    }
});

organizationAPI.get("/", (req : Request, res : Response) => {
    //todo attribute security
    res.json(handler.orgs.values())    
});

organizationAPI.post("/", (req : Request, res : Response) => {
    try {
        //todo authentication and basic security checks
        const data = req.body as IOrg
        handler.addOrg(createOrganization(data))
        const response : IResponse = {
            message: 'Success, new orginization added!',
            data: data,
            status: 200,
        } 
        res.json(response)    
    } catch (error) {
        const response : IResponse = {
            message: "could not process data object!",
            error: error,
            status: 500,
        }
        res.status(500).json(response)    
    }
        
});

organizationAPI.put("/", (req : Request, res : Response) => {
    // note: this might not survive final implemntation
    try {
        //todo authentication and basic security checks
        const data = req.body as IOrg
        handler.updateOrg(data.id, data);
        const response : IResponse = {
            message: 'Success, orginization updated!',
            data: data,
            status: 200,
        } 
        res.json(response)    
    } catch (error) {
        const response : IResponse = {
            message: "could not process data object!",
            error: error,
            status: 500,
        }
        res.status(500).json(response)    
    }   
});

organizationAPI.post("/:id/addUser", (req : Request, res : Response) => {
    try {
        //todo authentication and basic security checks, also owner settings so that others can add.
        const id = req.params.id
        const data = req.body as IProfile
        handler.getOrg(id).members.push(createProfile(data))
        const response : IResponse = {
            message: 'Success, user added to organization!',
            data: data,
            status: 200,
        } 
        res.json(response)    
    } catch (error) {
        const response : IResponse = {
            message: "could not process data object!",
            error: error,
            status: 500,
        }
        res.status(500).json(response)    
    }
        
});

organizationAPI.get("/:id/removeUser/:uid", (req : Request, res : Response) => {
    try {
        //todo authentication and basic security checks, also owner settings so that others can add.
        const id = req.params.id
        const uid = req.params.uid
        handler.getOrg(id).remove(uid)
        const response : IResponse = {
            message: 'Success, user removed from organization',
            status: 200,
        } 
        res.json(response)    
    } catch (error) {
        const response : IResponse = {
            message: "could not find user!",
            error: error,
            status: 404,
        }
        res.status(404).json(response)    
    }
        
});


export default organizationAPI;