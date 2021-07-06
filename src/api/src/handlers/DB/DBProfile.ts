import { assert } from "console";
import Profile, { IProfile } from "../../objects/Profile";
import IDBConnector, { DBConnector, DBTables } from "./DBConnector";

export default class DBProfile implements IDBConnector{
    private static _instance? : DBProfile;

    public static get instance(){
        if(!this._instance)
            this._instance = new DBProfile();
        return this._instance!;
    }

    public async updateItem(item: IProfile): Promise<void> {
        await DBConnector.instance.update(DBTables.Profiles, "name = "+ item.name, "oid = " + item.oid);
    }
    public async addItem(item: IProfile): Promise<void> {
       await DBConnector.instance.insert(DBTables.Profiles, ["name, oid"], item.name, item.oid);
    }
    public async getById(id: string) : Promise<Profile>{
        return await DBConnector.instance.getItem(DBTables.Profiles, id);
    }
    public async getIndexes() : Promise<Array<string>> {
        const items = await DBConnector.instance.getAll(DBTables.Profiles, "id")
        if(!items)
            return [];
        return items!;
    }

}