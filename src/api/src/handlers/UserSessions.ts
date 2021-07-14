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
    if (raw)
      raw.forEach((e: any) => {
        this.users.set(
          e._id.toString(),
          createProfile({
            _id: e._id.toString(),
            oid: e.oid.toString(),
            name: e.name,
          })
        );
      });
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
    const id = profile._id
      ? mongoose.Types.ObjectId(profile._id)
      : mongoose.Types.ObjectId();

    MongoDBConnector.Models.Profile.create({
      _id: id,
      name: res.name,
      oid: res.oid,
    });
    this.users.set(id.toString(), createProfile(res));
  }

  public get activeUsers(): Map<string, Profile> {
    const ref: Map<string, Profile> = new Map<string, Profile>();
    this.users.forEach((user, key) => ref.set(key, user));
    return ref;
  }

  public async updateUser(id: string, data: Partial<IProfile>) {
    await this.fetchIndexes();
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
