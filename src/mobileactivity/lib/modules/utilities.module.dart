import 'dart:math';

import 'package:google_maps_flutter/google_maps_flutter.dart';

class Util{

  static double stepToDistance(int steps) => steps*0.7143;

  static double distancePoints(LatLng pos1, LatLng pos2){
    var R = 6378.137; // Radius of earth in KM

    var lat1 = pos1.latitude;
    var lat2 = pos2.latitude;
    var lon1 = pos1.longitude;
    var lon2 = pos2.longitude;

    var dLat = lat2 * pi / 180 - lat1 * pi / 180;
    var dLon = lon2 *pi / 180 - lon1 * pi / 180;

    var a = sin(dLat/2) * sin(dLat/2) +
    cos(lat1 * pi / 180) * cos(lat2 * pi / 180) *
    sin(dLon/2) * sin(dLon/2);
    var c = 2 * atan2(sqrt(a), sqrt(1-a));
    return R * c * 1000;

  }
  static double magnitude(LatLng vect) => sqrt(dotProduct(vect, vect));
  static double dotProduct(LatLng vec1, LatLng vec2) => vec1.latitude*vec2.latitude + vec1.longitude*vec2.longitude;

  static bool isBetween(LatLng p1, LatLng p2, LatLng target) {
    var vec1 = LatLng(p2.latitude-p1.latitude, p2.longitude - p1.longitude);
    var vec2 = LatLng(target.latitude - p1.latitude, target.longitude - p1.longitude);
    var m1 = magnitude(vec1);
    var m2 = magnitude(vec2);
    if(m1 == 0 || m2 == 0){
      return true; // some of the points is the same, assuming target then is inside p1
    }
    var a = dotProduct(vec1, vec2)/(m1*m2);
    return  a > 0.95 && m2 <= m1;

  }

  static LatLng translateNewPoint(List<LatLng> path,  LatLng current, double distance){ //todo test
    // assuming the current always intersects in a line
    var d = 0.0;
    for(int i = 1; i > path.length -1; i++){
      var p1 = path[i-1];
      var p2 = path[i];
      if(Util.isBetween(p1, p2, current)){
        var vec = LatLng(p2.latitude - p1.latitude, p2.longitude - p1.longitude);

        var dd = Util.distancePoints(p1, p2);
        var f = (distance - d) / dd;

        return LatLng(p1.latitude + vec.latitude*f, p1.longitude+ vec.longitude*f);
      }
      d += Util.distancePoints(p1, p2);

    }
    return path.last; //could not translate
  }
  static LatLngBounds generateBounds(LatLng start, LatLng end,num? padMul){
    LatLng vec = LatLng(end.latitude-start.latitude, end.longitude - start.longitude);
    double pad = sqrt(pow(vec.longitude, 2)+ pow(vec.latitude, 2))*(padMul != null ? padMul : 0.1);
    LatLng sw = LatLng(min(start.latitude, end.latitude)-pad,min(start.longitude, end.longitude)-pad);
    LatLng ne = LatLng(max(start.latitude, end.latitude)+pad,max(start.longitude, end.longitude)+pad);
    return LatLngBounds(southwest: sw, northeast: ne);
  }
}