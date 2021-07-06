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

}