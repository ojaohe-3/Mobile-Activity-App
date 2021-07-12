import assert from "assert";
import GameSession, { createSession, ISession } from "../models/GameSession";
import { MongoDBConnector, MongoModels } from "./DB/MongoDBConnector";

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
    raw.forEach((e: { id: string; }) => {
      this._existingSession.push(e.id);
    });
  }

  private async unloaded(id: string): Promise<ISession | null> {
    await this.fetchIndexes();
    let unloaded = this._existingSession.filter((e) => e === id);
    if (unloaded.length === 1) return await MongoDBConnector.instance.findOne(id, MongoModels.SESSION);
    else return null;
  }

  public async setSession(session: GameSession) {
    const unloaded = await this.unloaded(session.id);
    if (!unloaded) {
      await MongoDBConnector.Models.Session.find();
      this._existingSession.push(session.id);
    }else
        await MongoDBConnector.instance.update(session.id, session as ISession, MongoModels.SESSION);
    

    this._sessions.set(session.id, session);
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
  public items(): GameSession[] {
    return Array.from(this._sessions.values());
  }

  public async update(session: ISession) {
    const old = await this.getSession(session.id);
    assert(old);
    old.update!(session.totalSteps, session.current);
  }
  public get indexes() : string[]{
    return this._existingSession;
  }

  // public removeUser(sid: string, uid: string) {
  //   const session = await this.getSession(sid)
   
  // }
}
