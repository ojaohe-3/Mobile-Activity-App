import assert from "assert";
import Profile from "../objects/Profile";
import DBProfile from "./DB/DBProfile";

export default class UserSessions {
  //todo add to database
  //todo add timeout of users
  private static instance?: UserSessions;
  private _activeUsers: Map<string, Profile>;
  private _allUsers: Array<string>;
  public constructor() {
    this._activeUsers = new Map<string, Profile>();
    this._allUsers = DBProfile.instance.getIndexes();
  }

  public static get Instance(): UserSessions {
    if (!this.instance) {
      this.instance = new UserSessions();
    }
    return this.instance;
  }

  public getUser(id: string): Profile {
    if (this._activeUsers.has(id)) {
      return this._activeUsers.get(id)!;
    } else {
      // user object is not active, and it exist in the database,
      // todo remove assert, make a syncronization call to the database if we dont find it.
      const db = this._allUsers.filter((i) => i === id);
      assert(db.length === 1);
      const profile = DBProfile.instance.getById(db[0])
      this._activeUsers.set(id, profile)
      return profile;
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
