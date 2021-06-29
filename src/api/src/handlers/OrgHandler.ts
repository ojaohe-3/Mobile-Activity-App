import assert from "assert";
import Organization, { createOrganization, IOrg } from "../objects/Organization";

export default class OrgHandler{
    //todo: connect to database
    private static instance? : OrgHandler;
    private _orgs : Map<string, Organization>
    public constructor(){
        this._orgs = new Map<string, Organization>();
    }

    public static get Instance(): OrgHandler {
        if(!this.instance){
            this.instance = new OrgHandler();
        }
        return this.instance;
    }

    public getOrg(id: string) : Organization {
        assert(this._orgs.has(id));
        return this._orgs.get(id)!;
    }

    public addOrg(org: Organization): void {
        this._orgs.set(org.id, org) ;
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