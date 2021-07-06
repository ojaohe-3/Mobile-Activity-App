


export interface IOrg{
    readonly id: string
    readonly name: string
    readonly members: Array<string>
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
    members: Array<string> 

    constructor(_id: string, _name: string, _members: Array<string>){
        this.id = _id
        this.name = _name
        this.members = _members
        
    }

    public add(member: string) : void {
        this.members.push(member)
    }

    public remove(_id: string) : void {
        let index = this.members.indexOf(_id)
    
        if(index >= 0)
            this.members.splice(index, 1)
    }
}