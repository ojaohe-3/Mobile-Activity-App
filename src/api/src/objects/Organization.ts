import Profile from "./Profile"


export interface IOrg{
    readonly id: string
    readonly name: string
    readonly members: Array<Profile>
}

export function createOrganization(org: IOrg) : Organization {
    return new Organization(
        org.id,
        org.name, 
        org.members)
}

export default class Organization implements IOrg {
    id: string
    name: string
    members: Array<Profile> 

    constructor(_id: string, _name: string, _members: Array<Profile>){
        this.id = _id
        this.name = _name
        this.members = _members
        
    }

    public add(member: Profile) : void {
        this.members.push(member)
    }

    public remove(_id: String) : void {
        let index = -1
        const filt = this.members.filter((p,i) => {p.id === _id; index = i;})
        if(index >= 0)
            this.members.splice(index, 1)
    }
}