export class GeoCoordinates{
    private latitude : number
    private longitude : number

    public constructor(latitude: number, longitude: number){
        this.latitude = latitude
        this.longitude = longitude
    }

    public get Latitude() {
        return this.latitude;
    }
    public get Longitude() {
        return this.longitude;
    }
}

export class GeoCoordinatesBound{
    private northeast : GeoCoordinates
    private southwest : GeoCoordinates
    private northwest : GeoCoordinates
    private southeast : GeoCoordinates

    public constructor(northeast : GeoCoordinates, southwest : GeoCoordinates){
        this.northeast = northeast
        this.southwest = southwest

        this.northwest = new GeoCoordinates(northeast.Latitude, southwest.Longitude)
        this.southeast = new GeoCoordinates(southwest.Latitude, northeast.Longitude)
    }
}