import assert from "assert";
import Profile, { createProfile, IProfile } from "../models/Profile";
import { MongoDBConnector, MongoModels } from "./DB/MongoDBConnector";
import { IProfileDocument } from "./DB/profile.model";

export default class UserSessions {
  //TODO add timeout of users
  private static instance?: UserSessions;
  private _activeUsers: Map<string, Profile>;
  private _allUsers: Array<string>;
  public constructor() {
    this._activeUsers = new Map<string, Profile>();
    this._allUsers = new Array<string>();
    this.fetchIndexes();
  }

  public static get Instance(): UserSessions {
    if (!this.instance) {
      this.instance = new UserSessions();
    }
    return this.instance;
  }

  private async fetchIndexes() {
    const raw = await MongoDBConnector.instance.findAll(MongoModels.PROFILE);
    if (raw) raw.forEach((e: { id: string }) => this._allUsers.push(e.id));
  }

  private async unloaded(id: string): Promise<IProfile | null> {
    await this.fetchIndexes();
    let unloaded = this._allUsers.filter((e) => e === id);
    if (unloaded.length === 1)
      return await MongoDBConnector.instance.findOne(id, MongoModels.PROFILE);
    else return null;
  }

  public async getUser(id: string): Promise<Profile> {
    if (this._activeUsers.has(id)) {
      return this._activeUsers.get(id)!;
    } else {
      const unloaded = await this.unloaded(id);
      assert(unloaded);
      const data = createProfile(unloaded);
      this._activeUsers.set(id, data);
      return data;
    }
  }

  public addUser(profile: Profile): void {
    let oid = profile.oid;
    if (profile.oid.length < 12)
      // FIXME
      oid = "000000000000";
    MongoDBConnector.instance.insert(
      { name: profile.name, oid: oid } as Partial<IProfileDocument>,
      MongoModels.PROFILE
    );
    this._allUsers.push(profile._id);
    this._activeUsers.set(profile._id, profile);
  }

  public get activeUsers(): Map<string, Profile> {
    const ref: Map<string, Profile> = new Map<string, Profile>();
    this._activeUsers.forEach((user, key) => ref.set(key, user));
    return ref;
  }

  public replaceUser(id: string, profile: Profile): void {
    assert(this._activeUsers.has(id));
    this._activeUsers.delete(id);
    this._activeUsers.set(profile._id, profile);
  }

  public updateUser(id: string, data: Partial<IProfile>) {
    assert(this._activeUsers.has(id));
    const profile = this._activeUsers.get(id)!;
    MongoDBConnector.instance.update(
      id,
      { name: profile.name, oid: profile.oid } as Partial<IProfileDocument>,
      MongoModels.PROFILE
    );
  }
  public async hasUser(id: string): Promise<boolean> {
    await this.fetchIndexes();
    if (this._activeUsers.has(id)) return true;
    if (this._allUsers.indexOf(id) != -1) return true;
    return false;
  }
  public async defaultOid(): Promise<string | null> {
    const raw = await MongoDBConnector.Models.Org.findOne({name: 'unassinged'});
    if(!raw) return null;
    return raw!._id as string;
  }
}
