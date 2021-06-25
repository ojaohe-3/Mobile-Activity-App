export default class User{
    private _endpoint: string
    private _name: string
    private _id: string
    private _steps: number
    
    // todo: add other steps of profile to allow user to communicate with all others in a gamesession
    
    constructor(_endpoint: string, _name: string, _id: string){
        this._endpoint = _endpoint
        this._name = _name
        this._id = _id
        this._steps = 0
    }

    public get endpoint(){
        return this._endpoint
    }

    public get name(){
        return this._name
    }

    public get id(){
        return this._id
    }

    public get steps(): number {
        return this._steps
    }
    public set steps(value: number) {
        this._steps = value
    }

}