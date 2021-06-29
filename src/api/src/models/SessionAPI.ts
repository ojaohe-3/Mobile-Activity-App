import { Router, Request, Response } from "express";

const org = Router();


org.get("/:id", (req : Request, res : Response) => {
    const id = req.params.id;
    
});