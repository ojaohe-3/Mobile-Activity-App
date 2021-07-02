export interface IEvent {
  on(key: string, handler: { (arg0?: any): void }): void;
  off(key: string) : void;
}
export class EventHandler implements IEvent {
  private handlers: Map<string, [(arg0?: any) => void]>;

  constructor() {
    this.handlers = new Map<string, [() => void]>();
  }
  
  public off(key: string) {
    if(this.handlers.has(key))
      this.handlers.delete(key);
  }

  public on(key: string, handler: () => void): void {
    if (this.handlers.has(key)) {
      this.handlers.get(key)!.push(handler);
    } else {
      this.handlers.set(key, [handler]);
    }
  }

  public run(key: string, arg0? : any) {
    if(this.handlers.has(key))

      this.handlers.get(key)!.map((e) => {
        if(arg0) e()
        else e(arg0)
      });
  }

  public expose(): IEvent {
    return this;
  }
}