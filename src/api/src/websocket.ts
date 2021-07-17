import assert from "assert"
import { IncomingMessage, Server } from "http"
import * as WebSocket from "ws"
import { EventHandler, IEvent } from "./handlers/EventHandler"
import SessionController from "./handlers/SessionController"
import UserSessions from "./handlers/UserSessions"
import { createSession, ISession, SessionUpdate } from "./models/GameSession"
import { createProfile, IProfile } from "./models/Profile"

export interface IReciveFormat{
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
interface WebsocketObject{
  ws: WebSocket,
  addr: string,
}

export enum SessionTypes{
  UpdateSession, JoinSession, LeaveSession, CreateSession
}

export class WebSocketHandler{
  private _wss : WebSocket.Server
  private _eventHandler : EventHandler
  private _clients: Map<string, WebsocketObject[]> 

  constructor(server : Server){
    this._clients = new Map<string, WebsocketObject[]>();
    this._wss = new WebSocket.Server({ server })
    this._eventHandler = new EventHandler()
    //TODO heartbeat
    this._wss.on("connection", (ws : WebSocket, req: IncomingMessage) => {
      console.log(new Date().toISOString(), "connection established")
      this._eventHandler.run("connected")
      ws.on("message", async (data) => {
        console.log(new Date().toISOString() ,"socket recived data")
        this._eventHandler.run("message")
        await this.handelIncoming(data as string, ws, req);
      })
    
      ws.on("close", () => {
        
        console.log(new Date().toISOString(), "closed connection")
        this._eventHandler.run("closed")
        this.handelClosuer(req);
      })
    })
  }

  private handelClosuer(req: IncomingMessage) {
    // We map all clients to there IP, if an IP changes this will not work as intended 
    // (it does not take dynamic ip into consideration for simplisity)
    // When a user close the idea is to remove them from the session, we do not want to send to a session that is closed so 
    // idealy this always remove any inactive users sessions
    // this could also be used to inform the session, to witch cannot be known beforehand without mapping ip 
    // because we cannot garantee input actually ever will send anything before closing and we make no guarantee of it

    const addr = req.socket.remoteAddress!;
    let key = "";
    this._clients.forEach((v, k) =>{
      if(v.filter(e => e.addr == addr).length > 0)
        key = k
    })
    const new_clients = this._clients.get(key)?.filter(e => e.addr !== addr)
    if(new_clients)
      this._clients.set(key!, new_clients) 
    }
  


  private async handelIncoming(data: string, ws: WebSocket, req: IncomingMessage) : Promise<void>{
    try {
 
      const parsed = JSON.parse(data) as IReciveFormat;
      const user = parsed.user
      const session = await SessionController.Instance.getSession(parsed.id);
      const wsObject = {ws: ws, addr: req.socket.remoteAddress!}; //This might be shit
      if(!this._clients.has(parsed.id))
        this._clients.set(parsed.id, [wsObject]);
      else{
        const clients = this._clients.get(parsed.id)
        clients!.push(wsObject)
        this._clients.set(parsed.id, clients!);
      }
      
      const type : SessionTypes = SessionTypes[parsed.type as keyof typeof SessionTypes]
      switch (type) {
        case SessionTypes.JoinSession:
          this._eventHandler.run('user:joined', parsed);
          
          session.updateEvent((update : SessionUpdate) => {
            const send : ITrasmitFormat = {
              data:  update,
              user: user
            }
            this._clients.get(update.id)?.forEach(ws => ws.ws.send(send));
            
          })
          // TODO inform clients that this user is currently active    
          break;
          case SessionTypes.UpdateSession:
              assert(parsed.data)
              this._eventHandler.run('user:update', parsed);
              const data = parsed.data!
              SessionController.Instance.update(parsed.id, data.nStep, data.nPos);
              break;
          // case SessionTypes.CreateSession: //this will more likley be used through api
          //   assert(parsed.session)
          //   this._eventHandler.run('create', parsed);
          //   SessionController.Instance.addSession(createSession(parsed.session!))
          //   break;
          case SessionTypes.LeaveSession:
            this._eventHandler.run('user:leave', parsed);
            SessionController.Instance.removeUser(parsed.id, parsed.user._id)
            break;
          case SessionTypes.JoinSession: // this indicate user are active to session
            this._eventHandler.run('user:join', parsed);
            const active = await SessionController.Instance.getSession(parsed.id)
            active.addprofile(createProfile(parsed.user));
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

    
