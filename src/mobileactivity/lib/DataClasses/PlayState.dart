
import 'package:google_maps_flutter/google_maps_flutter.dart';

class PlayState {
  final LatLng start;
  final LatLng end;
  LatLng current;
  int totalSteps;
  String id;
  final List<LatLng> path;
  final LatLngBounds bounds;
  final String name;
  final double distance;
  final String orgId;
  PlayState(
      {required this.start,
      required this.end,
      required this.name,
      required this.path,
      required this.id,
      required this.totalSteps,
      required this.current,
      required this.bounds,
      required this.distance,
      required this.orgId});

  // factory PlayState.fromJson(Map<String, dynamic> json) :
  Map<String, dynamic> toJson() => {
        '_id': this.id,
         'start': this.start.toJson(),
        'name' : this.name,
        'end': this.end.toJson(),
        'current': this.current.toJson(),
        'totalSteps': this.totalSteps,
        'path': this.path.map((e) => e.toJson()).toList(),
        'bounds': this.bounds.toJson(),
        'distance': this.distance,
        'orgId': this.orgId
      };

  factory PlayState.fromJson(
          Map<String, dynamic>
              json) => //todo this might need support function for nested types
      PlayState(
          start: LatLng.fromJson(json['start'])!,
          end: LatLng.fromJson(json['end'])!,
          path: parsePathJson(json['path']),
          id: json['id'],
          name: json['name'],
          totalSteps: json['totalSteps'],
          current: LatLng.fromJson(json['current'])!,
          bounds: LatLngBounds.fromList(json['bounds'])!,
          distance: json['distance'],
          orgId: json['orgId']);
}
List<LatLng> parsePathJson(List<dynamic> raw){
  return raw.map((e) => LatLng.fromJson(e)!).toList();
}
//helper class for the setup map
class PointSelection {
  final LatLng start;
  final LatLng end;
  final List<LatLng> polyLine;
  final double distance;

  PointSelection(this.start, this.end, this.polyLine, this.distance);
}

