import { IProfile } from "../models/Profile";
import { IReciveFormat, WebSocketHandler } from "../websocket";

export interface IDataPoint {
  sessionId: string;
  userId: string;
  steps: number;
}

export class Monitor {
  private static _instance?: Monitor;

  public static get instance(): Monitor {
    return Monitor._instance!;
  }
  public static set instance(instance: Monitor) {
    Monitor._instance = instance;
  }

  private points: IDataPoint[];

  constructor(websocket: WebSocketHandler) {
    websocket.listen().on("user:update", this.processData);
    this.points = Array<IDataPoint>();
  }

  processData(data: IReciveFormat): void {

    console.log("points")
    if (data.data)
      Monitor.instance.points.push({
        sessionId: data.id,
        userId: data.user._id,
        steps: data.data!.nStep,
      });
  }
  public get Points(): IDataPoint[] {
    return this.points;
  }
}
