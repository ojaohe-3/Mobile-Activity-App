

export default interface IDBConnector {
  // note: this might be loadbalanced, thus must be statless, and calls to sync must be called when ever there is new data being pushed.
  // to keep syncronization, make sure, that whenever data is asked for does not exist, the sync is called in the asking object.

  updateItem(item: any): void,
  addItem(item: any): void,
  removeItem(id: string): void,
  getById(id: string) : any,
  getIndexes(): string[],

}

export class DBConnector{
  private static _instance? : DBConnector;
  private ready = false;

  public static get instance(): DBConnector{
    if(!this._instance){
      this._instance = new DBConnector();
    }
    return this._instance;
  }

  constructor(){
    // this.connectDatabase();
  }

}
