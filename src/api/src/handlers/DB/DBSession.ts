import GameSession, { ISession } from "../../objects/GameSession";
import IDBConnector from "./DBConnector";

export default class DBSession implements IDBConnector{
    
    private static _instance? : DBSession

    public static get instance(): DBSession {
        if (!this._instance) {
            this._instance = new DBSession();
        }
        return this._instance;
    }

    public updateItem(item: ISession): void {
        throw new Error("Method not implemented.");
    }
    public addItem(item: ISession): void {
        throw new Error("Method not implemented.");
    }
    public removeItem(id: string): void {
        throw new Error("Method not implemented.");
    }
    public getById(id: string) : GameSession {
        throw new Error("Method not implemented.");
    }
    public getIndexes(): string[] {
        throw new Error("Method not implemented.");
    }
}