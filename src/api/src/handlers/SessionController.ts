import assert from "assert";
import GameSession, { createSession, ISession } from "../models/GameSession";
import { GeoCoordinates } from "../models/geoCoordinates.model";
import { MongoDBConnector, MongoModels } from "./DB/MongoDBConnector";
import { ISessionDocument } from "./DB/session.model";

export default class SessionController {



  //TODO add datamonitors that assosiate statistic to user.

  private static instance?: SessionController;
  private _existingSession: Array<string>;
  private _sessions: Map<string, GameSession>;

  public constructor() {
    this._sessions = new Map<string, GameSession>();
    this._existingSession = new Array<string>();
    // this.fetchIndexes();
  }

  public static get Instance(): SessionController {
    if (!this.instance) this.instance = new SessionController();

    return this.instance!;
  }

  private async fetchIndexes() {
    
    const raw = await MongoDBConnector.instance.findAll(MongoModels.SESSION) as Array<ISession>;
    raw.forEach((e: any) => {
      this._existingSession.push(e._id);
    });
  }

  private async unloaded(id: string): Promise<ISession | null> {
    await this.fetchIndexes();
    let unloaded = this._existingSession.filter((e) => e === id);
    if (unloaded.length === 1) {
      const raw : ISessionDocument= await MongoDBConnector.instance.findOne(id, MongoModels.SESSION);
      
      const converted : ISession = {
        orgId: raw.orgId.toString(),
        _id: raw._id.toString(),
        name: raw.name,
        start: raw.start,
        end: raw.end,
        path: raw.path,
        bounds: raw.bounds,
        current: raw.current,
        totalSteps: raw.totalSteps,
        distance: raw.distance,
      }
      return converted
    }
    else return null;
  }

  public async addSession(session: GameSession) {
    const unloaded = await this.unloaded(session._id);
    if (!unloaded) {
      await MongoDBConnector.Models.Session.create(unloaded);
      this._existingSession.push(session._id);
    }else
        await MongoDBConnector.instance.update(session._id, {...session}, MongoModels.SESSION);
    

    this._sessions.set(session._id, session);
  }



  public async getSession(id: string): Promise<GameSession> {
    if (this._sessions.has(id)) return this._sessions.get(id)!;
    else {
      const unloaded = await this.unloaded(id);
      assert(unloaded);
      const data = createSession(unloaded);
      this._sessions.set(id, data);
      return data;
    }
  }
  public async items(): Promise<GameSession[]> {
    const raw = await MongoDBConnector.instance.findAll(MongoModels.SESSION);
    await raw.map(async (s: any) => {
      const unloaded = await this.unloaded(s._id);
      if(unloaded) return createSession(unloaded)
      const session : ISession = {
        orgId: s.orgId.toString(),
        _id: s._id.toString(),
        name: s.name,
        start: s.start,
        end: s.end,
        path: s.path,
        bounds: s.bounds,
        current: s.current,
        totalSteps: s.totalSteps,
        distance: s.distance
      }
      return createSession(session)
    })
    return raw as GameSession[];
  }

  public async update(id: string, steps: number, nPos: GeoCoordinates) {
  
    if(this._sessions.has(id)){
      const session = this._sessions.get(id);
      session!.update(steps, nPos);
      this._sessions.set(id, session!);
  
      await MongoDBConnector.instance.update(id, {...session}, MongoModels.SESSION)
    }
    else{
      const unloaded = await this.unloaded(id);
      if(!unloaded) return;
      const session = createSession(unloaded!);
      session.update(steps, nPos);
      await MongoDBConnector.instance.update(id, {...session}, MongoModels.SESSION)
    }

  }
  public get indexes() : string[]{
    return this._existingSession;
  }

  public async removeUser(sid: string, uid: string) {
    const session = await this.getSession(sid)
    session.removeUser(uid);

  }
}
