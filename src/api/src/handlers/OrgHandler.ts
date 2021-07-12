import assert from "assert";
import Organization, { createOrganization, IOrg } from "../models/Organization";
import { MongoDBConnector, MongoModels } from "./DB/MongoDBConnector";

export default class OrgHandler {
  private static instance?: OrgHandler;
  private _orgs: Map<string, Organization>;
  private _allorgs: Array<string>;

  public constructor() {
    this._orgs = new Map<string, Organization>();
    this._allorgs = new Array<string>();
    this.fetchIndexes();
  }

  public static get Instance(): OrgHandler {
    if (!this.instance) {
      this.instance = new OrgHandler();
    }
    return this.instance;
  }

  private async fetchIndexes() {
    this._allorgs = [];
    const raw = await MongoDBConnector.instance.findAll(MongoModels.ORG);
    if (raw) {
      raw!.forEach((e: any) => this._allorgs.push(e._id.toString()));
    }
  }

  private async unloaded(id: string): Promise<IOrg | null> {
    await this.fetchIndexes()
    const unloaded = this._allorgs.filter((e) => e === id)
    if (unloaded.length === 1)
      return await MongoDBConnector.instance.findOne(
        unloaded[0],
        MongoModels.ORG
      );
    else return null;
  }

  public async getOrg(id: string): Promise<Organization | null> {
    if (this._orgs.has(id)) return this._orgs.get(id)!;
    else {
      const unloaded = await this.unloaded(id);
      if(unloaded){
        const data = createOrganization(unloaded!);
        this._orgs.set(id, data);
        return data;
      }else{
        return null;
      }
    }
  }

  public async addOrg(org: Organization): Promise<void> {
    const unloaded = await this.unloaded(org._id);
    const body = {
      name: org.name,
      members: org.members,
    };
    if (!unloaded) {
      await MongoDBConnector.instance.insert(body, MongoModels.ORG);
      this._allorgs.push(org._id);
    } else
      await MongoDBConnector.instance.update(org._id, body, MongoModels.ORG);

    this._orgs.set(org._id, org);
  }

  public get orgs(): Map<string, Organization> {
    this.fetchIndexes();
    const ref: Map<string, Organization> = new Map<string, Organization>();
    this._orgs.forEach((e, key) => ref.set(key, e));
    return ref;
  }

  public get indexes() : Array<String>{
    // console.log(this._allorgs)
    return this._allorgs;
  }

  public updateOrg(_id: string, data: IOrg) {
    assert(this._orgs.has(_id));
    this._orgs.set(_id, createOrganization(data));
  }
}
