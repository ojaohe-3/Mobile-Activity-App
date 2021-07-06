import { EventHandler, IEvent } from "../handlers/EventHandler"
import {GeoCoordinates, GeoCoordinatesBound} from "../models/geoCoordinates.model"
import Organization from "./Organization"
import Profile, { IProfile } from "./Profile"

export interface ISession {
    readonly org : Organization
    readonly id: string
    readonly name : string
    readonly start : GeoCoordinates
    readonly end : GeoCoordinates
    readonly path : Array<GeoCoordinates>
    readonly bounds : GeoCoordinatesBound
    current: GeoCoordinates
    totalSteps: number
    readonly distance: string
}
export interface SessionUpdate{
    nStep: number,
    nPos: GeoCoordinates
  }

export function createSession(  
    session: ISession): GameSession{
        return new GameSession(
            session.org, 
            session.id, 
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
    org : Organization
    id: string
    name : string
    start : GeoCoordinates
    end : GeoCoordinates
    path : Array<GeoCoordinates>
    bounds : GeoCoordinatesBound
    current: GeoCoordinates
    totalSteps: number
    distance: string
    private _eventHandler : EventHandler


  constructor(
    _org: Organization, 
    _id: string, 
    _name: string, 
    _start: GeoCoordinates, 
    _end: GeoCoordinates, 
    _path: Array<GeoCoordinates>, 
    _bounds: GeoCoordinatesBound, 
    _current: GeoCoordinates, 
    _totalSteps: number,
    _distance: string
    
) {
    this.org = _org
    this.id = _id
    this.name = _name
    this.start = _start
    this.end = _end
    this.path = _path
    this.bounds = _bounds
    this.current = _current
    this.totalSteps = _totalSteps
    this.distance = _distance
    this._eventHandler = new EventHandler()
    }

  public updateEvent(handler : (arg0 : SessionUpdate) => void) : void{
        this._eventHandler.expose().on("update", handler)
  }

  //TODO maybe we want to calculate the new geo point by steps in this api....
  public update(delta_steps: number, npos: GeoCoordinates){
      this.totalSteps += delta_steps;
      this.current = npos;
      this._eventHandler.run('update', { nStep : this.totalSteps, nPos :this.current} as SessionUpdate);
  }

}