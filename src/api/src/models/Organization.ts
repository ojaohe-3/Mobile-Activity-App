


export interface IOrg{
    readonly _id: string
    readonly name: string
    readonly members: Array<string>
}

export function createOrganization(org: IOrg) : Organization {
    return new Organization(
        org._id,
        org.name, 
        org.members)
}

export default class Organization implements IOrg {
    _id: string
    name: string
    members: Array<string> 

    constructor(_id: string, _name: string, _members: Array<string>){
        this._id = _id
        this.name = _name
        this.members = _members
        
    }

    public add(member: string) : void {
        this.members.push(member)
    }

    public remove(_id: string) : void {
        let index = this.members.indexOf(_id)
        console.log("Org Remove member from "+ this.name)
        console.log(this.members)
        if(index >= 0)
            this.members.splice(index, 1)
        console.log(this.members)

    }
}