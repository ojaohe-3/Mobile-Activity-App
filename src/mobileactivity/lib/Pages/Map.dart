
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/playstate.dart';
class GMap extends StatefulWidget {
  const GMap({Key? key}) : super(key: key);

  @override
  _GMapState createState() => _GMapState();
}

class _GMapState extends State<GMap> {

  late PlayState _state;
  LatLng? start;
  LatLng? end;
  List<LatLng>? mid;

  final CameraPosition _initPos = CameraPosition(
      target: LatLng(59.31083496902317, 18.070700059158135),
      zoom: 12
  );
  late GoogleMapController _googleMapController;

  @override
  void dispose() {
    this._googleMapController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GoogleMap(
        myLocationButtonEnabled: false,
        zoomControlsEnabled: false, //todo add support
        initialCameraPosition: _initPos,
        onMapCreated: (controller) => _googleMapController = controller,
        onLongPress: addMarker,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _googleMapController.animateCamera(
          CameraUpdate.newCameraPosition(_initPos)
        ),
        backgroundColor: Theme.of(context).primaryColor,
        focusColor: Colors.white70,
        child: Icon(Icons.center_focus_strong),
      ),
    );
  }


  void addMarker(LatLng argument) {

  }
}
