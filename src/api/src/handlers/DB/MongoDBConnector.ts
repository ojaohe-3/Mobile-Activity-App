import { DBConnector } from "./DBConnector";
import { connection, connect, Connection, ObjectId } from "mongoose";
import profile, { IProfile, ProfileModel } from "../../models/profile.model";
import org, { IOrg, OrgModel } from "../../models/org.model";
import session, { ISession, SessionModel } from "../../models/session.model";

export declare interface IModels {
  Profile: ProfileModel;
  Session: SessionModel;
  Org: OrgModel;
}

export type MongoDocument = IProfile | ISession | IOrg;

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
    connect(process.env.MONGO_URI ?? "mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._db = connection;
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

  public async findOne(id: ObjectId, model: MongoModels): Promise<any | null> {
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.findById(id);
      case MongoModels.PROFILE:
        return await this._models.Profile.findById(id);
      case MongoModels.SESSION:
        return await this._models.Session.findById(id);
    }
  }

  public async findAll(model: MongoModels): Promise<any | null> {
    switch (model) {
      case MongoModels.ORG:
        return await this._models.Org.findAll(query);
      case MongoModels.PROFILE:
        return await this._models.Profile.findAll(query);
      case MongoModels.SESSION:
        return await this._models.Session.findAll(query);
    }
  }

  public async insert(
    document: MongoDocument,
    model: MongoModels
  ): Promise<any | null> {
    let obj: MongoDocument;
    switch (model) {
      case MongoModels.ORG:
        obj = await this._models.Org.create(document);
        if ((await obj.exists()).length != 0) {
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
        return await this._models.Org.findOneAndRemove(id);
      case MongoModels.PROFILE:
        return await this._models.Profile.findOneAndRemove(id);
      case MongoModels.SESSION:
        return await this._models.Session.findOneAndRemove(id);
    }
  }
}

export enum MongoModels {
  ORG = "org",
  PROFILE = "profiles",
  SESSION = "session",
}
