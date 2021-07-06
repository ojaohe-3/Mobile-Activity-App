// import assert from "assert";
// import GameSession, { ISession } from "../../objects/GameSession";
// import IDBConnector, { DBConnector, DBTables } from "./DBConnector";

// export default class DBSession implements IDBConnector {
//   private static _instance?: DBSession;

//   public static get instance(): DBSession {
//     if (!this._instance) {
//       this._instance = new DBSession();
//     }
//     return this._instance;
//   }

//   public async updateItem(item: ISession): Promise<void> {
//     await DBConnector.instance.update(
//       DBTables.GameSessions,
//       item.id,
//       "GameSessions.oid=" + item.org.id,
//       "GameSessions.body=" + JSON.stringify(item),
//       "GameSessions.flag = 1"
//     );
//   }
//   public async addItem(item: ISession): Promise<void> {
//     await DBConnector.instance.insert(
//       DBTables.GameSessions,
//       ["sid, oid, body, flag"],
//       item.id,
//       item.org.id,
//       JSON.stringify(item),
//       1
//     );
//   }
//   public async getById(id: string): Promise<ISession> {
//     const obj = await DBConnector.instance.getItem(DBTables.GameSessions, id);
//     return JSON.parse(obj.body) as ISession;
//   }
//   public async getIndexes(): Promise<string[]> {
//     const items = await DBConnector.instance.getAll(
//       DBTables.GameSessions,
//       "sid"
//     );
//     if (!items) return [];
//     return items;
//   }
// }
