import assert from "assert";
import Profile from "../objects/Profile";

export default class UserSessions{
    //todo add to database
    //todo add timeout of users
    private static instance? : UserSessions;
    private _activeUsers : Map<string, Profile>
    public constructor(){
        this._activeUsers = new Map<string, Profile>();
    }

    public static get Instance(): UserSessions {
        if(!this.instance){
            this.instance = new UserSessions();
        }
        return this.instance;
    }

    public getUser(id: string) : Profile {
        assert(this._activeUsers.has(id));
        return this._activeUsers.get(id)!;
    }

    public addActiveUser(profile: Profile): void {
        this._activeUsers.set(profile.id,profile) ;
    }

    public get activeUsers(): Map<string, Profile> {
        const ref : Map<string, Profile> = new Map<string, Profile>();
        this._activeUsers.forEach((user, key) => ref.set(key,user));
        return ref;
    }
}