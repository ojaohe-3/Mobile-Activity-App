import Profile, { IProfile } from "../../objects/Profile";
import IDBConnector from "./DBConnector";

export default class DBProfile implements IDBConnector{
    private static _instance? : DBProfile;

    public static get instance(){
        if(!this._instance)
            this._instance = new DBProfile();
        return this._instance!;
    }

    public updateItem(item: IProfile): void {
        throw new Error("Method not implemented.");
    }
    public addItem(item: IProfile): void {
        throw new Error("Method not implemented.");
    }
    public removeItem(id: string): void {
        throw new Error("Method not implemented.");
    }
    public getById(id: string) : Profile{
        throw new Error("Method not implemented.");
    }
    public getIndexes(): string[] {
        throw new Error("Method not implemented.");
    }

}