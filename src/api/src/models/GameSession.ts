import { EventHandler, IEvent } from "../handlers/EventHandler"
import {GeoCoordinates, GeoCoordinatesBound} from "../models/geoCoordinates.model"
import Organization from "./Organization"
import Profile, { IProfile } from "./Profile"

export interface ISession {
    readonly orgId : string
    _id: string
    readonly name : string
    readonly start : GeoCoordinates
    readonly end : GeoCoordinates
    readonly path : Array<GeoCoordinates>
    readonly bounds : GeoCoordinatesBound
    current: GeoCoordinates
    totalSteps: number
    readonly distance: number
}
export interface SessionUpdate{
    id: string,
    nStep: number,
    nPos: GeoCoordinates
  }

export function createSession(  
    session: ISession): GameSession{
        return new GameSession(
            session.orgId, 
            session._id, 
            session.name,
            session.start, 
            session.end,
            session.path, 
            session.bounds, 
            session.current, 
            session.totalSteps,
            session.distance
        );
    }

export default class GameSession implements ISession{

    orgId : string
    _id: string
    name : string
    start : GeoCoordinates
    end : GeoCoordinates
    path : Array<GeoCoordinates>
    bounds : GeoCoordinatesBound
    current: GeoCoordinates
    totalSteps: number
    distance: number
    private _eventHandler : EventHandler
    private _members : Array<IProfile>

  constructor(
    _org: string, 
    _id: string, 
    _name: string, 
    _start: GeoCoordinates, 
    _end: GeoCoordinates, 
    _path: Array<GeoCoordinates>, 
    _bounds: GeoCoordinatesBound, 
    _current: GeoCoordinates, 
    _totalSteps: number,
    _distance: number
    
) {
    this.orgId = _org
    this._id = _id
    this.name = _name
    this.start = _start
    this.end = _end
    this.path = _path
    this.bounds = _bounds
    this.current = _current
    this.totalSteps = _totalSteps
    this.distance = _distance
    this._eventHandler = new EventHandler()
    this._members = new Array<Profile>();
    }

  public updateEvent(handler : (arg0 : SessionUpdate) => void) : void{
        this._eventHandler.expose().on("update", handler)
  }
  public addprofile(user: IProfile) {
    this._members.push(user)
  }
  public get members() : Array<IProfile>{
    return this._members
  }

  
  //TODO maybe we want to calculate the new geo point by steps in this api....
  public update(delta_steps: number, npos: GeoCoordinates){
      this.totalSteps += delta_steps;
      this.current = npos;
      this._eventHandler.run('update', { nStep : this.totalSteps, nPos :this.current, id: this._id} as SessionUpdate);
  }
  public removeUser(uid: string) {
    this._members = this._members.filter((p) => p._id !== uid);
  }

}