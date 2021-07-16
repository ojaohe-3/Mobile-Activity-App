import assert from "assert"
import { IncomingMessage, Server } from "http"
import * as WebSocket from "ws"
import { EventHandler, IEvent } from "./handlers/EventHandler"
import SessionController from "./handlers/SessionController"
import UserSessions from "./handlers/UserSessions"
import { createSession, ISession, SessionUpdate } from "./models/GameSession"
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
  private _clients: Map<string, WebsocketObject[]> //TODO tuple 

  constructor(server : Server){
    this._clients = new Map<string, WebsocketObject[]>();
    this._wss = new WebSocket.Server({ server })
    this._eventHandler = new EventHandler()
    //TODO heartbeat
    this._wss.on("connection", (ws : WebSocket, req) => {
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
    const addr = req.socket.remoteAddress!.toString();
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
      console.log(data)
      const parsed = JSON.parse(data) as IReciveFormat;
      const user = createProfile(parsed.user)
      UserSessions.Instance.addUser(user); //TODO user heartbeat update
      const session = await SessionController.Instance.getSession(parsed.id);
      const wsObject = {ws: ws, addr: req.socket.remoteAddress!.toString()}; //This might be shit
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
          session.addprofile(user);
          this._eventHandler.run('user:joined');
          
          session.updateEvent((update : SessionUpdate) => {
            const send : ITrasmitFormat = {
              data:  update,
              user: user
            }
            console.log("sending message",)
            this._clients.get(update.id)?.forEach(ws => ws.ws.send(send));
            
          })
          // TODO inform clients that this user is currently active    
          break;
          case SessionTypes.UpdateSession:
              assert(parsed.data)
              this._eventHandler.run('update');
              const data = parsed.data!
              SessionController.Instance.update(parsed.id, data.nStep, data.nPos);
              break;
          case SessionTypes.CreateSession: //this will more likley be used through api
            assert(parsed.session)
            this._eventHandler.run('create');
            SessionController.Instance.addSession(createSession(parsed.session!))
            break;
          case SessionTypes.LeaveSession:
            this._eventHandler.run('user:leave');
            SessionController.Instance.removeUser(parsed.id, parsed.user._id)
            break;
          case SessionTypes.JoinSession: // this indicate user are active to session
            this._eventHandler.run('user:join');
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

    
