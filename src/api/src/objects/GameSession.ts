import { EventHandler, IEvent } from "../handlers/EventHandler"
import {GeoCoordinates, GeoCoordinatesBound} from "./GeoCoordinates"
import Organization from "./Organization"
import Profile from "./Profile"

export interface ISession {
    readonly org : Organization
    readonly profiles : Array<Profile>
    readonly id: string
    readonly name : string
    readonly start : GeoCoordinates
    readonly end : GeoCoordinates
    readonly path : Array<GeoCoordinates>
    readonly bounds : GeoCoordinatesBound
    current: GeoCoordinates
    totalSteps: number
}

export function createSession(  
    session: ISession): GameSession{
        return new GameSession(
            session.org, 
            session.profiles, 
            session.id, 
            session.name,
            session.start, 
            session.end,
            session.path, 
            session.bounds, 
            session.current, 
            session.totalSteps
        );
    }
export default class GameSession implements ISession{
    org : Organization
    profiles : Array<Profile>
    id: string
    name : string
    start : GeoCoordinates
    end : GeoCoordinates
    path : Array<GeoCoordinates>
    bounds : GeoCoordinatesBound
    current: GeoCoordinates
    totalSteps: number
    private _eventHandler : EventHandler


  constructor(
    _org: Organization, 
    _profiles: Array<Profile>, 
    _id: string, 
    _name: string, 
    _start: GeoCoordinates, 
    _end: GeoCoordinates, 
    _path: Array<GeoCoordinates>, 
    _bounds: GeoCoordinatesBound, 
    _current: GeoCoordinates, 
    _totalSteps: number,
    
) {
    this.org = _org
    this.profiles = _profiles
    this.id = _id
    this.name = _name
    this.start = _start
    this.end = _end
    this.path = _path
    this.bounds = _bounds
    this.current = _current
    this.totalSteps = _totalSteps
    this._eventHandler = new EventHandler()
  }

  public updateAvailable() : IEvent{
      return this._eventHandler.expose()
  }

  public addprofile(profile: Profile) : void {
    this.profiles.push(profile)
  }

  public removeProfile(profile: Profile) : void {
      let index = -1
      const filt = this.profiles.filter((p,i) => {p.id === profile.id; index = i;})
      if(index >= 0)
        this.profiles.splice(index, 1)
  }
  //todo maybe we want to calculate the new geo point by steps in this api....
  public update(delta_steps: number, npos: GeoCoordinates){
      this.totalSteps += delta_steps;
      this.current = npos;
      this._eventHandler.run('update');
  }


}