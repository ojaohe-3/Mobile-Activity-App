import assert from "assert";
import Organization, {
  createOrganization,
  IOrg,
} from "../objects/Organization";
import DBOrg from "./DB/DBOrg";

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
    this._allorgs = await DBOrg.instance.getIndexes();
    console.log(this._allorgs)
    
  }

  private async unloaded(id: string): Promise<IOrg | null> {
    await this.fetchIndexes();
    const unloaded = this._allorgs.filter((e) => e === id);
    if (unloaded.length === 1) return await DBOrg.instance.getById(unloaded[0]);
    else return null;
  }

  public async getOrg(id: string): Promise<Organization> {
    if (this._orgs.has(id)) return this._orgs.get(id)!;
    else {
      const unloaded = await this.unloaded(id)
      assert(unloaded);
      const data = createOrganization(unloaded);
      this._orgs.set(id, data);
      return data;
    }
  }

  public async addOrg(org: Organization): Promise<void> {
    const unloaded = await this.unloaded(org.id);
    if (!unloaded) {
      await DBOrg.instance.addItem(org);
      this._allorgs.push(org.id);
    } else await DBOrg.instance.updateItem(org);

    this._orgs.set(org.id, org);
  }

  public get orgs(): Map<string, Organization> {
    const ref: Map<string, Organization> = new Map<string, Organization>();
    this._orgs.forEach((e, key) => ref.set(key, e));
    return ref;
  }

  public updateOrg(_id: string, data: IOrg) {
    assert(this._orgs.has(_id));
    this._orgs.set(_id, createOrganization(data));
  }
}
