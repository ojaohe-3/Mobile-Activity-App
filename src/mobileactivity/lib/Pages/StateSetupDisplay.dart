import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/widgets/Header.dart';
import 'package:mobileactivity/widgets/ProgressWidged.dart';

class StateDisplay extends StatefulWidget {
  const StateDisplay({Key? key}) : super(key: key);

  @override
  _StateDisplayState createState() => _StateDisplayState();
}

class _StateDisplayState extends State<StateDisplay> {
  late CameraPosition _initPos;

  // late GoogleMapController _googleMapController;
  late PlayState _state;
  late CameraTargetBounds _initBounds;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    // this._googleMapController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _state = ModalRoute.of(context)!.settings.arguments as PlayState;
    _initPos = CameraPosition(target: _state.start, zoom: 12);
    _initBounds = CameraTargetBounds(_state.bounds);
    return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(color: Colors.blue[900]),
        centerTitle: true,
        backgroundColor: Colors.white,
      ),
      body: Column(children: [
        SizedBox(
          height: 300,
          child: GoogleMap(
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            initialCameraPosition: _initPos,
            cameraTargetBounds: _initBounds,
            // onMapCreated: (controller) => _googleMapController = controller,
            markers: {
              Marker(markerId: MarkerId('start'), position: _state.start),
              Marker(markerId: MarkerId('end'), position: _state.end),
              Marker(markerId: MarkerId('current'), position: _state.current),
            },
            polylines: {
              Polyline(
                polylineId: PolylineId("Path"),
                points: _state.route,
                color: Colors.red,
                width: 8,
              )
            },
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text('Title: ${_state.id}')
          ],
        )
      ]),
    );
  }
}

//todo fix lamo
