import assert from "assert"
import { IncomingMessage, Server } from "http"
import * as WebSocket from "ws"
import { EventHandler, IEvent } from "./handlers/EventHandler"
import SessionController from "./handlers/SessionController"
import UserSessions from "./handlers/UserSessions"
import { createSession, ISession, SessionUpdate } from "./objects/GameSession"
import { createProfile, IProfile } from "./models/Profile"

interface IReciveFormat{
  type: string,
  id : string,
  data?: SessionUpdate,
  session?: ISession,
  user: IProfile,
}

interface ITrasmitFormat{
  data: SessionUpdate,
  user: IProfile,

}

export enum SessionTypes{
  UpdateSession, JoinSession, LeaveSession, CreateSession
}

export class WebSocketHandler{
  private _wss : WebSocket.Server
  private _eventHandler : EventHandler
  private _clients: Map<string, WebSocket>

  constructor(server : Server){
    this._clients = new Map<string, WebSocket>();
    this._wss = new WebSocket.Server({ server })
    this._eventHandler = new EventHandler()
    //TODO heartbeat
    this._wss.on("connection", (ws : WebSocket, req) => {
      console.log(new Date().toISOString(), "connection established")
      this._eventHandler.run("connected")
      ws.on("message", async (data) => {
        console.log(new Date().toISOString(), data)
        this._eventHandler.run("message")
        await this.handelIncoming(data as string, req, ws);
      })
    
      ws.on("close", () => {
        
        console.log(new Date().toISOString(), "closed connection")
        this._eventHandler.run("closed")
        this.handelClosuer(req);
      })
    })
  }

  private handelClosuer(req: IncomingMessage) {
    //1. inform session that a user have closed.
    //2. inform UserSessions a session is closed
    //3. inform all clients, tho not strictly nessecary
    }
  


  private async handelIncoming(data: string, req: IncomingMessage, ws: WebSocket) : Promise<void>{
    try {
      const parsed = JSON.parse(data) as IReciveFormat;
      const user = createProfile(parsed.user)
      UserSessions.Instance.addUser(user); //TODO user heartbeat update
      const session = await SessionController.Instance.getSession(parsed.id);
      
      this._clients.set(parsed.id, ws);
      
      const type : SessionTypes = SessionTypes[parsed.type as keyof typeof SessionTypes]
      
      switch (type) {
        case SessionTypes.JoinSession:
          session.addprofile(user);
          this._eventHandler.run('joined');
          
          session.updateEvent((update : SessionUpdate) => {
            const send : ITrasmitFormat = {
              data:  update,
              user: user
            }
            console.log("context keeped?")
            this._clients.forEach(ws => ws.send(send));
            
          })
          // TODO inform clients that this user is currently active    
          break;
          case SessionTypes.UpdateSession:
              assert(parsed.data)
              this._eventHandler.run('update');
              const data = parsed.data!
              session.update(data.nStep, data.nPos)
              break;
          case SessionTypes.CreateSession:
            assert(parsed.session)
            SessionController.Instance.setSession(createSession(parsed.session!))
            break;
          case SessionTypes.LeaveSession:
            SessionController.Instance.removeUser(parsed.id, parsed.user.id)
        }
      }catch (error) {
      console.log(error)
      // TODO : error handeling

    }
  }
  public listen(): IEvent {
    return this._eventHandler.expose();
  } 



}

    
