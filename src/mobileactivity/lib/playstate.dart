import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class PlayState{

  final LatLng start;
  final LatLng end;
  LatLng current;
  int totalSteps;
  final String source; // networking, source of our information todo.
  final String details; // data related to sessions contet, i.e. members, status etc. Active maintained outside of app.
  final String _id;

  PlayState(LatLng start,LatLng end, String source,String _id, String details) :
    this.start = start,
    this.end = end,
    this._id = _id,
    this.current = LatLng(0, 0),
    this.totalSteps = 0,
    this.details = details,
    this.source = source;
    // todo connect to source


  static PlayState generateInstanceFromFile(String? file){
    return PlayState(LatLng(0,0), LatLng(0,0), 'source', '_id', 'details'); //todo
  }
  void stateListener(){
    // todo
    // a listener that fires when new infromation on the state is retrived.
    // if we have an external module it will use the source.
  }

}
