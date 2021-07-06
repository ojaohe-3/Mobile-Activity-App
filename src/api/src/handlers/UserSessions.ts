import assert from "assert";
import Profile, { createProfile, IProfile } from "../objects/Profile";
import DBProfile from "./DB/DBProfile";

export default class UserSessions {
  //TODO add to database
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
    this._allUsers = await DBProfile.instance.getIndexes();
  }

  private async unloaded(id: string): Promise<IProfile | null> {
    await this.fetchIndexes();
    let unloaded = this._allUsers.filter((e) => e === id);
    if (unloaded.length === 1) return await DBProfile.instance.getById(id);
    else return null;
  }

  public async getUser(id: string): Promise<Profile> {
    if (this._activeUsers.has(id)) {
      return this._activeUsers.get(id)!;
    } else {
      const unloaded = await this.unloaded(id);
      assert(unloaded)
      const data = createProfile(unloaded);
      this._activeUsers.set(id, data);
      return data;
    }
  }

  public addUser(profile: Profile): void {
    DBProfile.instance.addItem(profile);
    this._allUsers.push(profile.id);
    this._activeUsers.set(profile.id, profile);
  }

  public get activeUsers(): Map<string, Profile> {
    const ref: Map<string, Profile> = new Map<string, Profile>();
    this._activeUsers.forEach((user, key) => ref.set(key, user));
    return ref;
  }

  public replaceUser(id: string, profile: Profile): void {
    assert(this._activeUsers.has(id));
    this._activeUsers.delete(id);
    this._activeUsers.set(profile.id, profile);
  }

  public updateUser(id: string){
      assert(this._activeUsers.has(id))
      DBProfile.instance.updateItem(this._activeUsers.get(id)!);
  }
}
