import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/widgets/Header.dart';

import '../DataClasses/PlayState.dart';

class StateSetupMap extends StatefulWidget {
  const StateSetupMap({Key? key}) : super(key: key);

  @override
  _StateSetupMapState createState() => _StateSetupMapState();
}

class _StateSetupMapState extends State<StateSetupMap> {
  String? title;


  Future<dynamic>? createAlert(context) {
    return showDialog(context: context, builder: (context) =>
        AlertDialog(
          content: Text("Are you sure of this path?"),
          actions: [
          IconButton(
              onPressed: () => Navigator.of(context).pop({'confirm': false}),
              icon: Icon(Icons.cancel_outlined)),
          IconButton(
              onPressed: () => Navigator.of(context).pop({'confirm': true}),
              icon: Icon(Icons.add))
          ],
        )
    );
  }
  Marker? _start;
  Marker? _end;
  List<LatLng>? polyLine;
  double distance = 0;
  //todo add support for multiple markers

  final CameraPosition _initPos = CameraPosition(
      target: LatLng(59.31083496902317, 18.070700059158135), zoom: 12);
  late GoogleMapController _googleMapController;

  @override
  void dispose() {
    this._googleMapController.dispose();
    super.dispose();
  }

  Future<void> addMarker(LatLng pos) async {
    if (_start == null || (_start != null && _end != null)) {

      setState(() {
        _start = Marker(
            markerId: const MarkerId('Start'),
            infoWindow: const InfoWindow(title: 'Start'),
            icon: BitmapDescriptor.defaultMarker,
            position: pos);
        _end = null;
      });
    } else {
      _end = Marker(
          markerId: const MarkerId('End'),
          infoWindow: const InfoWindow(title: 'End'),
          icon:
          BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
          position: pos);
      dynamic route = await ApiCalls.getDirectionApi(
          _start!.position, _end!.position);

      route = route['routes'][0];
      PolylinePoints polylinePoints = PolylinePoints();
      distance = route['distance'];


          setState(() {
        polyLine =
            polylinePoints.decodePolyline(route['geometry'])
                .map((e) => LatLng(e.latitude, e.longitude))
                .toList();
        _end;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(color: Colors.blue[900]),
        centerTitle: true,
        backgroundColor: Colors.white,
      ),
      body: GoogleMap(
        myLocationButtonEnabled: false,
        zoomControlsEnabled: false,
        initialCameraPosition: _initPos,
        onMapCreated: (controller) => _googleMapController = controller,
        onLongPress: addMarker,
        markers: {if (_start != null) _start!, if (_end != null) _end!},
        polylines: {
          if (this.polyLine != null)
            Polyline(
              polylineId: PolylineId("Path"),
              points: this.polyLine!,
              color: Colors.red,
              width: 5,
            )
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (_start != null && _end != null && polyLine != null)
            ? () async {
                var confirm = await createAlert(context);
                if(confirm['confirm'])
                  Navigator.of(context).pop(PointSelection(this._start!.position, this._end!.position, this.polyLine!, this.distance));
              }
            : null,
        backgroundColor: Theme.of(context).primaryColor,
        focusColor: Colors.white70,
        child: Icon(Icons.add),
      ),
    );
  }
}
// todo display ontop of map if we have a line, distance and possibly other params