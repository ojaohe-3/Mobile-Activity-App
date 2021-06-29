import assert from "assert";
import GameSession, { ISession } from "../objects/GameSession"
import DBSession from "./DB/DBSession";


export default class SessionController{

    
    private static instance? : SessionController;
    private _existingSession: Array<string>;
    private _sessions : Map<string, GameSession> 
    

    public constructor(){
        this._sessions = new Map<string, GameSession>();
        this._existingSession = DBSession.instance.getIndexes();
    }


    public static get Instance() : SessionController {
        if(!this.instance)
            this.instance = new SessionController();

        return this.instance!;
    }


    public setSession(session : GameSession){
        const unloaded = this._existingSession.filter( e => e === session.id);
        
        if(unloaded.length === 1){
            session = DBSession.instance.getById(session.id);
        }else{
            DBSession.instance.addItem(session);
            this._existingSession.push(session.id);
        }
        this._sessions.set(session.id, session);
    }

    public getSession(id : string) : GameSession {
        if(this._sessions.has(id))
            return this._sessions.get(id)!;
        else {
            // todo remove assert, make a syncronization call to the database if we dont find it.
            const unloaded = this._existingSession.filter( e => e === id);
            assert(unloaded.length === 1);
            const data = DBSession.instance.getById(unloaded[0]);
            this._sessions.set(id, data);
            return data;

        }
    }
    public items(): Map<string, GameSession> {
        const s = new Map<string, GameSession>();
        this._sessions.forEach((session, id) => {s.set(id, session)})
        return s;
    }

    public update(session: ISession) {
        const old = this.getSession(session.id);
        old.update(session.totalSteps, session.current);
    }
}