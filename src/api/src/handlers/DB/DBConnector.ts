import sqlite3 from "sqlite3";
import { Database, ISqlite, open } from "sqlite"
export default interface IDBConnector {
  // note: this might be loadbalanced, thus must be statless, and calls to sync must be called when ever there is new data being pushed.
  // to keep syncronization, make sure, that whenever data is asked for does not exist, the sync is called in the asking object.

  updateItem(item: any): Promise<void>,
  addItem(item: any): Promise<void>,
  getById(id: string) : Promise<any | null>,
  getIndexes(): Promise<Array<string> | null>,

}

export class DBConnector{
  private static _instance? : DBConnector;
  private db?: Database<sqlite3.Database, sqlite3.Statement>;

  public static get instance(): DBConnector{
    if(!this._instance){
      this._instance = new DBConnector();
    }
    return this._instance;
  }

  constructor(){
    this.connectDatabase();
  }
  private async connectDatabase() {
    const path = `${__dirname}\\db\\database.db` //FIXME
    console.log(path)
    const config : ISqlite.Config = {
      filename: path,
      driver: sqlite3.Database,
    }
    this.db = await open(config)
  }
//TODO make pepared and each statments to make all querries work instead of directly
  public async getAll(table: DBTables, ...col: string[]): Promise<Array<any> | null>
  {
    if(this.db){
      if (col.length > 0)
        col = ["*"]
      return await this.db!.all(`SELECT ${col.toString()} FROM ${table.toString()}`)
    }
    else
      return null;
  }

  public async getItem(table: DBTables, id : string) : Promise<any | null> {
    if(this.db)
      return await this.db.get(`SELECT * FROM ${table.toString()} WHERE ${table.toString()}.id = (?)`, id)
    else
      return null;
  }

  public async insert(table: DBTables, col : string[], ...values: any[]) : Promise<void> {
    if(this.db)
      await this.db.run(`INSERT INTO ${table.toString()} (${col.toString()}) VALUES (${values.toString()})`)
  }
 
  public async update(table: DBTables, id : string, ...col: string[]) : Promise<void> {
    if(this.db)
      await this.db.run(`UPDATE ${table.toString()} SET ${col.toString()} WHERE ${table.toString()}.id = ${id}`)
  }

  public async run(query : string, ...args : any[]) : Promise<any | null>{
    if(this.db)
      return await this.db.run(query, ...args)
    else
      return null;
  }
}

export enum DBTables{
  Org, Profiles, GameSessions,Session_Profiles
}