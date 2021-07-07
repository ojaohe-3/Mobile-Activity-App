import { DBConnector } from "./DBConnector";
import mongoose, { connection, connect, Connection, ObjectId } from "mongoose";
import profile, { IProfileDocument, ProfileModel } from "./profile.model";
import org, { IOrgDocument, OrgModel } from "./org.model";
import session, { ISessionDocument, SessionModel } from "./session.model";

const dotenv = require("dotenv");
dotenv.config();
export declare interface IModels {
  Profile: ProfileModel;
  Session: SessionModel;
  Org: OrgModel;
}

export type MongoDocument = IProfileDocument | ISessionDocument | IOrgDocument;

export class MongoDBConnector extends DBConnector {
  private _db: Connection;
  private _models: IModels;

  public static get instance(): MongoDBConnector {
    if (!this._instance) {
      this._instance = new MongoDBConnector();
    }
    return this._instance as MongoDBConnector;
  }

  public static get Models(): IModels {
    return this.instance._models;
  }

  constructor() {
    super();
    mongoose.connect(process.env.MONGO_URI ?? "mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._db = mongoose.connection;
    this._db.on("open", this.connected);
    this._db.on("error", this.error);
    this._models = {
      Profile: profile,
      Session: session,
      Org: org,
    };
  }

  private connected() {
    console.log("MongoDB connection initialized!");
  }

  private error(error: any) {
    console.log("MongoDB:Error initializing connection", error);
  }

  public async query(query: Object, model: MongoModels): Promise<any | null> {
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.query(query);
      case MongoModels.PROFILE:
        return await this._models.Profile.query(query);
      case MongoModels.SESSION:
        return await this._models.Session.query(query);
    }
  }

  public async findOne(id: string, model: MongoModels): Promise<any | null> {
    const _id = mongoose.Types.ObjectId(id);
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.findById(_id);
      case MongoModels.PROFILE:
        return await this._models.Profile.findById(_id);
      case MongoModels.SESSION:
        return await this._models.Session.findById(_id);
    }
  }

  public async findAll(model: MongoModels): Promise<any | null> {
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.find();
      case MongoModels.PROFILE:
        return await this._models.Profile.find();
      case MongoModels.SESSION:
        return await this._models.Session.find();
    }
  }

  public async insert(
    document: Partial<MongoDocument>,
    model: MongoModels
  ): Promise<any | null> {
    let obj: MongoDocument;
    switch (model) {
      case MongoModels.ORG:
        obj = await this._models.Org.create(document);
        if ((await obj.exists).length != 0) {
          throw new Error("Org already exists!!");
        }
        await obj.save();
        break;
      case MongoModels.PROFILE:
        obj = await this._models.Profile.create(document);
        if ((await obj.exists()).length != 0) {
          throw new Error("Org already exists!!");
        }
        await obj.save();
        break;
      case MongoModels.SESSION:
        obj = await this._models.Session.create(document);
        if ((await obj.exists()).length != 0) {
          throw new Error("Org already exists!!");
        }
        await obj.save();
        break;
    }
  }

  public async update(
    id: string,
    document: Partial<MongoDocument>,
    model: MongoModels
  ): Promise<any | null> {
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.findOneAndUpdate({ _id: id }, document);
      case MongoModels.PROFILE:
        return await this._models.Profile.findOneAndUpdate(
          { _id: id },
          document
        );
      case MongoModels.SESSION:
        return await this._models.Session.findOneAndUpdate(
          { _id: id },
          document
        );
    }
  }

  public async delete(id: string, model: MongoModels): Promise<any | null> {
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.findOneAndRemove({_id : id});
      case MongoModels.PROFILE:
        return await this._models.Profile.findOneAndRemove({_id : id});
      case MongoModels.SESSION:
        return await this._models.Session.findOneAndRemove({_id : id});
    }
  }
}

export enum MongoModels {
  ORG = "org",
  PROFILE = "profiles",
  SESSION = "session",
}
