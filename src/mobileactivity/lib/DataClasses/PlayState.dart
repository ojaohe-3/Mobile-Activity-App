import 'dart:convert';
import 'dart:math';

import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/DataClasses/org.dart';

class PlayState {
  final LatLng start;
  final LatLng end;
  LatLng current;
  int totalSteps;
  final String id; // identifier token
  final String title;
  final List<LatLng> path;
  final LatLngBounds bounds;

  final String distance;
  final Org org;
  PlayState(
      {required this.start,
      required this.end,
      required this.path,
      required this.id,
      required this.title,
      required this.totalSteps,
      required this.current,
      required this.bounds,
      required this.distance,
      required this.org});

  static Future<PlayState?> generateInstanceFromAPI(String id) async {
    // todo
    // access api for specific session, return the playstate and save to local sessions, null if it failed
  }

  static PlayState? generateInstanceFromFile(String? file) {
    // return PlayState(LatLng(0,0), LatLng(0,0), 'source', '_id', 'details'); //todo
  }

  void stateListener() {
    // todo
    // a listener that fires when new information on the state is retrieved.
    // if we have an external module it will use the source. otherwise will ignore this method
  }

  // factory PlayState.fromJson(Map<String, dynamic> json) :
  Map<String, dynamic> toJson() => {
        'id': this.id,
        'title': this.title,
        'start': this.start.toJson(),
        'end': this.start.toJson(),
        'current': this.current.toJson(),
        'totalSteps': this.totalSteps,
        'path': this.path.map((e) => e.toJson()).toList(),
        'bounds': this.bounds.toJson(),
        'distance': this.distance,
        'org': this.org.toJson()
      };

  factory PlayState.fromJson(
          Map<String, dynamic>
              json) => //todo this might need support function for nested types
      PlayState(
          start: LatLng.fromJson(json['start'])!,
          end: LatLng.fromJson(json['end'])!,
          path: parsePathJson(json['path']),
          id: json['id'],
          title: json['title'],
          totalSteps: json['totalSteps'],
          current: LatLng.fromJson(json['current'])!,
          bounds: LatLngBounds.fromList(json['bounds'])!,
          distance: json['distance'],
          org: Org.fromJson(json['org']));
}
List<LatLng> parsePathJson(List<dynamic> raw){
  return raw.map((e) => LatLng.fromJson(e)!).toList();
}
//helper class for the setup map
class PointSelection {
  final LatLng start;
  final LatLng end;
  final List<LatLng> polyLine;
  final String distance;

  PointSelection(this.start, this.end, this.polyLine, this.distance);
}

