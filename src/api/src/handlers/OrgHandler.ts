import assert from "assert";
import Organization, { createOrganization, IOrg } from "../objects/Organization";
import DBOrg from "./DB/DBOrg";

export default class OrgHandler{
    private static instance? : OrgHandler;
    private _orgs : Map<string, Organization>
    private _allorgs: Array<string>

    public constructor(){
        this._orgs = new Map<string, Organization>();
        this._allorgs = DBOrg.instance.getIndexes()
    }

    public static get Instance(): OrgHandler {
        if(!this.instance){
            this.instance = new OrgHandler();
        }
        return this.instance;
    }

    public getOrg(id: string) : Organization {
        if(this._orgs.has(id))
            return this._orgs.get(id)!;
        else{
            const unloaded = this._allorgs.filter( e => e === id);
            assert(unloaded.length === 1);
            const data = DBOrg.instance.getById(unloaded[0]);
            return data;

        }
    }

    public addOrg(org: Organization): void {
        const unloaded = this._allorgs.filter( e => e === org.id)
        if(unloaded.length === 1){
            DBOrg.instance.addItem(org);
        }

        this._orgs.set(org.id, org);
    }

    public get orgs(): Map<string, Organization> {
        const ref : Map<string, Organization> = new Map<string, Organization>();
        this._orgs.forEach((e, key) => ref.set(key,e));
        return ref;
    }
    
    public updateOrg(_id: string, data: IOrg) {
        assert(this._orgs.has(_id));
        this._orgs.set(_id, createOrganization(data));
    }
}