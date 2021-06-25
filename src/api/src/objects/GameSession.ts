import {GeoCoordinates, GeoCoordinatesBound} from "./GeoCoordinates";
import Organization from "./Organization";
import User from "./User";


export default class GameSession{
    /**
     * only current and totalsteps is editable, all others are strictly read only
     */
    private _org : Organization;
    private _users : Array<User>;
    private _id: string;
    private _name : string;
    private _start : GeoCoordinates;
    private _end : GeoCoordinates;
    private _path : Array<GeoCoordinates>;
    private _bounds : GeoCoordinatesBound;
    private _current: GeoCoordinates;
    private _totalSteps: number;

    

  constructor(
    org: Organization, 
    users: Array<User>, 
    _id: string, 
    _name: string, 
    start: GeoCoordinates, 
    end: GeoCoordinates, 
    path: Array<GeoCoordinates>, 
    bounds: GeoCoordinatesBound, 
    _current: GeoCoordinates, 
    _totalSteps: number
) {
    this._org = org
    this._users = users
    this._id = _id
    this._name = _name
    this._start = start
    this._end = end
    this._path = path
    this._bounds = bounds
    this._current = _current
    this._totalSteps = _totalSteps
  }

    /**
     * Getter org
     * @return {Organization}
     */
	public get org(): Organization {
		return this._org;
	}

    /**
     * Getter users
     * @return {Array<User>}
     */
	public get users(): Array<User> {
		return this._users;
	}

    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter start
     * @return {GeoCoordinates}
     */
	public get start(): GeoCoordinates {
		return this._start;
	}

    /**
     * Getter end
     * @return {GeoCoordinates}
     */
	public get end(): GeoCoordinates {
		return this._end;
	}

    /**
     * Getter path
     * @return {Array<GeoCoordinates>}
     */
	public get path(): Array<GeoCoordinates> {
		return this._path;
	}

    /**
     * Getter bounds
     * @return {GeoCoordinatesBound}
     */
	public get bounds(): GeoCoordinatesBound {
		return this._bounds;
	}

    /**
     * Getter current
     * @return {GeoCoordinates}
     */
	public get current(): GeoCoordinates {
		return this._current;
	}

    /**
     * Setter current
     * @param {GeoCoordinates} value
     */
	public set current(value: GeoCoordinates) {
		this._current = value;
	}

    /**
     * Getter totalSteps
     * @return {number}
     */
	public get totalSteps(): number {
		return this._totalSteps;
	}

    /**
     * Setter totalSteps
     * @param {number} value
     */
	public set totalSteps(value: number) {
		this._totalSteps = value;
	}
    
    
}