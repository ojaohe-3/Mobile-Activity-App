import assert from "assert";
import mongoose from "mongoose";
import Profile, { createProfile, IProfile } from "../models/Profile";
import { MongoDBConnector, MongoModels } from "./DB/MongoDBConnector";
import { IProfileDocument } from "./DB/profile.model";

export default class UserSessions {
  //TODO add timeout of users
  private static instance?: UserSessions;
  private users: Map<string, Profile>;

  public constructor() {
    this.users = new Map<string, Profile>();
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
    if (raw) raw.forEach((e: any) => this.addUser(e));
  }

  public async getUser(id: string): Promise<Profile | undefined> {
    await this.fetchIndexes();
    return this.users.get(id);
  }

  public addUser(profile: Partial<IProfile>): void {
    assert(profile.name && profile.oid);

    const res: IProfile = {
      name: profile.name,
      _id: "",
      oid: profile.oid,
    };
    let id = mongoose.Types.ObjectId();
    if(profile._id)
      id = mongoose.Types.ObjectId(profile._id);

    MongoDBConnector.Models.Profile.create({
      _id: id,
      name: res.name,
      oid: res.oid,
    });
    console.log("usersession _id: "+ id);
    this.users.set(id.toString(), createProfile(res));
  }

  public get activeUsers(): Map<string, Profile> {
    const ref: Map<string, Profile> = new Map<string, Profile>();
    this.users.forEach((user, key) => ref.set(key, user));
    return ref;
  }

  public replaceUser(id: string, profile: Profile): void {
    assert(this.users.has(id));
    this.users.delete(id);
    this.users.set(profile._id, profile);
  }

  public updateUser(id: string, data: Partial<IProfile>) {
    assert(this.users.has(id));
    const profile = this.users.get(id)!;
    MongoDBConnector.instance.update(
      id,
      { name: data.name, oid: data.oid } as Partial<IProfileDocument>,
      MongoModels.PROFILE
    );
  }
  public async hasUser(id: string): Promise<boolean> {
    await this.fetchIndexes();
    return this.users.has(id);
  }
  public async defaultOid(): Promise<string | null> {
    const raw = await MongoDBConnector.Models.Org.findOne({
      name: "unassinged",
    });
    if (!raw) return null;
    return raw!._id as string;
  }
}
