import assert from "assert";
import GameSession from "../objects/GameSession"
import DBConnector from "./DBConnector";

export default class SessionController{
    private static instance? : SessionController;
    private _existingSession: Array<String>;
    private _sessions : Map<string, GameSession> 
    

    public constructor(){
        this._sessions = new Map<string, GameSession>();
        this._existingSession = DBConnector.Instance.getExistingSessionsIDs();
    }


    public static get Instance() : SessionController {
        if(!this.instance)
            this.instance = new SessionController();

        return this.instance!;
    }


    public setSession(session : GameSession){
        const unloaded = this._existingSession.filter( e => e === session.id);
        if(unloaded.length === 1){
            session = DBConnector.Instance.getSessionByID(session.id);
        }else{
            DBConnector.Instance.setNewSession(session);
        }
        this._sessions.set(session.id, session);
    }

    public getSession(id : string) : GameSession {
        if(this._sessions.has(id))
            return this._sessions.get(id)!;
        else {
            const unloaded = this._existingSession.filter( e => e === id);
            assert(unloaded.length == 1);
            return DBConnector.Instance.getSessionByID(unloaded[0]);

        }
    }

}