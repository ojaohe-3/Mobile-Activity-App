import { Router, Request, Response } from "express";
import { Monitor  } from "../handlers/DataMonitor";


const dataAPI = Router();


dataAPI.get("/", (req: Request, res: Response) => {
    res.json(Monitor.instance.Points);

});
export default dataAPI;
