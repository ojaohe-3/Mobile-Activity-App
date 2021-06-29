export interface IProfile{
    readonly name: string
    readonly id: string
    steps: number
}

export function createProfile(profile : IProfile) : Profile{
    return new Profile(
        profile.id,
        profile.name,
        profile.steps
    )
}

export default class Profile implements IProfile{
    name: string
    id: string
    steps: number
    
    // todo: add other steps of profile to allow user to communicate with all others in a gamesession
    
    constructor( _name: string, _id: string, _steps : number){
       
        this.name = _name
        this.id = _id
        this.steps = _steps
    }

}