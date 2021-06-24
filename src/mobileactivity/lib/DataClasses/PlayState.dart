import 'dart:math';

import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class PlayState{

  final LatLng start;
  final LatLng end;
  late LatLng current;
  int totalSteps = 0;
  final String source; // networking, source of our information, api related todo.
  final String id;
  final List<LatLng> route;
  LatLngBounds? bounds;

  PlayState(
    this.start,
    this.end,
    this.source,
    this.route,
    this.id){
    this.current = this.start;

    // generate bounds
    LatLng vec = LatLng(end.latitude-start.latitude, end.longitude - start.longitude);
    double pad = sqrt(pow(vec.longitude, 2)+ pow(vec.latitude, 2))*0.1;
    LatLng sw = LatLng(min(start.latitude, end.latitude)-pad,min(start.longitude, end.longitude)-pad);
    LatLng ne = LatLng(max(start.latitude, end.latitude)+pad,max(start.longitude, end.longitude)+pad);

    this.bounds = LatLngBounds(southwest: sw, northeast: ne);
  }
  static Future<PlayState?> generateInstanceFromAPI(String id) async {
    // todo
    // access api for specific session, return the playstate and save to local sessions, null if it failed
  }
  static PlayState? generateInstanceFromFile(String? file){
    // return PlayState(LatLng(0,0), LatLng(0,0), 'source', '_id', 'details'); //todo
  }
  void stateListener(){
    // todo
    // a listener that fires when new information on the state is retrieved.
    // if we have an external module it will use the source. otherwise will ignore this method
  }

}

//helper class for the setup map
class PointSelection{
  final LatLng start;
  final LatLng end;
  final List<LatLng> polyLine;
  PointSelection(this.start, this.end, this.polyLine);
}