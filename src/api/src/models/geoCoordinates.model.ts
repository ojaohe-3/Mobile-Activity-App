export interface GeoCoordinates{
    latitude : number,
    longitude : number,
}

export interface GeoCoordinatesBound{
    northeast : GeoCoordinates,
    southwest : GeoCoordinates,
    // northwest : GeoCoordinates,
    // southeast : GeoCoordinates,
}