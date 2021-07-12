export interface IDBConnector {
  instace?: IDBConnector;
}

export abstract class DBConnector implements IDBConnector {
  protected static _instance?: DBConnector;

  public static get instance(): DBConnector {
    throw new Error("Method not implemented.");
  }
}
