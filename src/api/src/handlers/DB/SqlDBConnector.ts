// import { DBConnector } from "./DBConnector";
// import sqlite3 from "sqlite3";
// import { Database, ISqlite, open } from "sqlite";

// export class SQLDBConnector extends DBConnector {
//   private db?: Database<sqlite3.Database, sqlite3.Statement>;

//   public static get instance(): SQLDBConnector {
//     if (!this._instance) {
//       this._instance = new SQLDBConnector();
//     }
//     return this._instance;
//   }

//   constructor() {
//     super();
//     this.connectDatabase();
//   }

//   private async connectDatabase(): Promise<void> {
//     const path = `${__dirname}\\db\\database.db`; //FIXME
//     const config: ISqlite.Config = {
//       filename: path,
//       driver: sqlite3.Database,
//     };
//     this.db = await open(config);
//   }

//   //TODO make pepared and each statments to make all querries work instead of directly
//   private async getAll(
//     table: DBTables,
//     ...col: string[]
//   ): Promise<Array<any> | null> {
//     if (this.db) {
//       if (col.length > 0) col = ["*"];
//       return await this.db!.all(
//         `SELECT ${col.toString()} FROM ${table.toString()}`
//       );
//     } else return null;
//   }

//   public getAllGameSessions() {
//     this.getAll(DBTables.GameSessions);
//   }

//   public async getItem(table: DBTables, id: string): Promise<any | null> {
//     if (this.db)
//       return await this.query(
//         `SELECT * FROM ${table.toString()} WHERE ${table.toString()}.id = (?)`,
//         id
//       );
//     else return null;
//   }

//   public async insert(
//     table: DBTables,
//     col: string[],
//     ...values: any[]
//   ): Promise<void> {
//     if (this.db)
//       await this.db.run(
//         `INSERT INTO ${table.toString()} (${col.toString()}) VALUES (${values.toString()})`
//       );
//   }

//   public async update(
//     table: DBTables,
//     id: string,
//     ...col: string[]
//   ): Promise<void> {
//     if (this.db)
//       await this.db.run(
//         `UPDATE ${table.toString()} SET ${col.toString()} WHERE ${table.toString()}.id = ${id}`
//       );
//   }

//   public async run(query: string, ...args: any[]): Promise<any | null> {
//     if (this.db) return await this.db.run(query, ...args);
//     else return null;
//   }
// }
