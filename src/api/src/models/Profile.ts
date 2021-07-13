import { profile } from "console"

export interface IProfile{
    readonly name: string
    readonly _id: string
    readonly oid: string
}

export function createProfile(profile : IProfile) : Profile{
    return new Profile(
        profile._id,
        profile.name,
        profile.oid
    )
}

export default class Profile implements IProfile{
    name: string
    _id: string
    oid: string
    
    constructor( _name: string, _id: string, _oid: string){
       
        this.name = _name
        this._id = _id
        this.oid = _oid
    }

    public update(profile : Partial<IProfile>){
        if(profile.name)
            this.name = profile.name;
        if(profile.oid)
            this.oid = profile.oid;
    }
}