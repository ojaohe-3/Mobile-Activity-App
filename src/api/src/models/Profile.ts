import { profile } from "console"

export interface IProfile{
    readonly name: string
    readonly id: string
    readonly oid: string
}

export function createProfile(profile : IProfile) : Profile{
    return new Profile(
        profile.id,
        profile.name,
        profile.oid
    )
}

export default class Profile implements IProfile{
    name: string
    id: string
    oid: string
    
    constructor( _name: string, _id: string, _oid: string){
       
        this.name = _name
        this.id = _id
        this.oid = _oid
    }

    public update(profile : Partial<IProfile>){
        if(profile.name)
            this.name = profile.name;
        if(profile.oid)
            this.oid = profile.oid;
    }
}