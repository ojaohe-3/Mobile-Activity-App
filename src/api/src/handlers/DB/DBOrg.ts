import Organization, { IOrg, createOrganization } from "../../objects/Organization";
import IDBConnector from "./DBConnector";

export default class DBOrg implements IDBConnector{
    
    private static _instance? : DBOrg;

    public static get instance() : DBOrg {
        if (!this._instance){
            this._instance = new DBOrg();
        }
        return this._instance!;
    }


    public updateItem(item: IOrg): void {
        throw new Error("Method not implemented.");
    }

    public addItem(item: IOrg): void {
        throw new Error("Method not implemented.");
    }

    public removeItem(id: string): void {
        throw new Error("Method not implemented.");
    }

    public getById(id: string) : Organization {
        throw new Error("Method not implemented.");
    }

    public getIndexes(): string[] {
        throw new Error("Method not implemented.");
    }
    
}