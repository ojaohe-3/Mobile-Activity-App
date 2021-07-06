import assert from "assert";
import GameSession, { createSession, ISession } from "../objects/GameSession";
import DBSession from "./DB/DBSession";
import UserSessions from "./UserSessions";

export default class SessionController {

  //TODO add datamonitors that assosiate statistic to user.

  private static instance?: SessionController;
  private _existingSession: Array<string>;
  private _sessions: Map<string, GameSession>;

  public constructor() {
    this._sessions = new Map<string, GameSession>();
    this._existingSession = new Array<string>();
    this.fetchIndexes();
  }

  public static get Instance(): SessionController {
    if (!this.instance) this.instance = new SessionController();

    return this.instance!;
  }

  private async fetchIndexes() {
    this._existingSession = await DBSession.instance.getIndexes();
  }

  private async unloaded(id: string): Promise<ISession | null> {
    await this.fetchIndexes();
    let unloaded = this._existingSession.filter((e) => e === id);
    if (unloaded.length === 1) return await DBSession.instance.getById(id);
    else return null;
  }

  public async setSession(session: GameSession) {
    const unloaded = await this.unloaded(session.id);
    if (!unloaded) {
      await DBSession.instance.addItem(session);
      this._existingSession.push(session.id);
    }else
        await DBSession.instance.updateItem(session);

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
  public items(): Map<string, GameSession> {
    const s = new Map<string, GameSession>();
    this._sessions.forEach((session, id) => {
      s.set(id, session);
    });
    return s;
  }

  public async update(session: ISession) {
    const old = await this.getSession(session.id);
    assert(old);
    old.update!(session.totalSteps, session.current);
  }

  public async removeUser(sid: string, uid: string) {
    const session = await this.getSession(sid)
    session.removeProfile(uid);
    await DBSession.instance
  }
}
