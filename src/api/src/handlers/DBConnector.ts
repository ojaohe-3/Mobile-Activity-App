import GameSession from "../objects/GameSession";

export default class DBConnector{
    setNewSession(session: GameSession) {
        throw new Error("Method not implemented.");
    }


    private static instance: DBConnector;


    public static get Instance(): DBConnector{
        if(!this.instance)
            this.instance = new DBConnector();
        return this.instance!;
    }

    public getExistingSessionsIDs(): String[] {
        throw new Error("Method not implemented.");
    }

    public getSessionByID(arg0: String): import("../objects/GameSession").default {
        throw new Error("Method not implemented.");
    }
}