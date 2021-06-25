import User from "./User"

export default class Organization{
    private _id: string
    private _name: string
    private _members: Array<User> //todo

    constructor(_id: string, _name: string, _members: Array<User>){
        this._id = _id
        this._name = _name
        this._members = _members
    }

    public get id() : string{
        return this._id
    }
    public get name() : string{
        return this._name
    }
    public get members() : Array<User>{ 
        return this._members
    }
}