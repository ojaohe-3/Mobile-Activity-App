import assert from "assert";
import Organization, { IOrg, createOrganization } from "../../objects/Organization";
import IDBConnector, { DBConnector, DBTables } from "./DBConnector";

export default class DBOrg implements IDBConnector{

    private static _instance? : DBOrg;

    public static get instance() : DBOrg {
        if (!this._instance){
            this._instance = new DBOrg();
        }
        return this._instance!;
    }

    public async updateItem(item: IOrg): Promise<void> {
        await DBConnector.instance.update(DBTables.Org, item.id, "name = "+ item.name);
    }
    public async addItem(item: IOrg): Promise<void> {

        await DBConnector.instance.insert(DBTables.Org, ["name"], item.name);
    }

    public async getById(id: string): Promise<IOrg> {
        const data = await DBConnector.instance.getItem(DBTables.Org, id);
        const members = await DBConnector.instance.run("SELECT * FROM Profiles WHERE Profiles.oid = (?)", id); //TODO transform into usable objects
       return {id : data.id, name : data.name, members : members}
    }
    public async getIndexes(): Promise<string[]> {
        const items = await DBConnector.instance.getAll(DBTables.Org, "id")
        if(!items)
            return [];
        return items!;
    }
    

    
}