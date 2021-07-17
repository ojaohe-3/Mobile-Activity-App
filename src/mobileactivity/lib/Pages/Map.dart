import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/DataClasses/Profile.dart';
import 'package:mobileactivity/modules/bluetooth.module.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/modules/utilities.module.dart';
import 'package:mobileactivity/widgets/Header.dart';
import 'package:mobileactivity/widgets/ProgressWidged.dart';

class GMap extends StatefulWidget {
  const GMap({Key? key}) : super(key: key);
  @override
  _GMapState createState() => _GMapState();
}

class _GMapState extends State<GMap> {
  late PlayState _state;
  late EventHandler _events;
  late CameraPosition _initPos;
  late CameraTargetBounds _initBound;
  late GoogleMapController _googleMapController;

  double progress = 0;
  Set<Marker> _markers = Set<Marker>();

  List<Profile> profiles = List.empty(growable: true);
  @override
  void initState() {
    //todo ask premission from the user

    super.initState();
  }

  @override
  void dispose() {
    this._googleMapController.dispose();
    WebSocketsController.instance.closeConnection();
    BluetoothModule.instance.dispose();
    super.dispose();
  }

  // Future<void> setProfiles(String id) async {
  //   this.profiles = await ApiCalls.getAppAPI(endpoint: 'session/$id/member/');
  // }

  void eventFire(PlayState state) {
    if (this.mounted)
      setState(() {
        this._state = state;
        _markers.removeWhere((element) => element.mapsId.value == 'current');
        _markers.add(
            Marker(markerId: MarkerId('current'), position: _state.current));
        progress = Util.stepToDistance(_state.totalSteps) / _state.distance;
      });
  }

  @override
  Widget build(BuildContext context) {
    _state = ModalRoute.of(context)!.settings.arguments as PlayState;
    // setProfiles(_state.id);
    _events = EventHandler(state: _state, callback: eventFire);

    _initPos = CameraPosition(
        target: _state.current, zoom: 12); //todo set zoom translation
    _initBound = CameraTargetBounds(_state.bounds);

    _markers.add(Marker(markerId: MarkerId('start'), position: _state.start));
    _markers.add(Marker(markerId: MarkerId('end'), position: _state.end));
    _markers
        .add(Marker(markerId: MarkerId('current'), position: _state.current));

    progress = Util.stepToDistance(_state.totalSteps) / _state.distance;
    return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(color: Colors.blue[900]),
        centerTitle: true,
        backgroundColor: Colors.white70,
      ),
      body: Stack(alignment: Alignment.center, children: [
        GoogleMap(
          myLocationButtonEnabled: false,
          zoomControlsEnabled: false,
          initialCameraPosition: _initPos,
          onMapCreated: (controller) => _googleMapController = controller,
          markers: _markers,
          cameraTargetBounds: _initBound,
          polylines: {
            Polyline(
              polylineId: PolylineId('route'),
              points: _state.path,
              color: Colors.red,
              width: 5,
            )
          },
        ),
        // Positioned(
        //   top: 10,
        //   left: 10,
        //   child: Expanded(
        //     child: ListView.builder(
        //         itemCount: this.profiles.length,
        //         itemBuilder: (context, index) {
        //           return Card(
        //               child: ListTile(
        //                 leading: CircleAvatar(backgroundColor: Colors.amber),
        //                 title: Text(this.profiles[index].name + ": steps here"),
        //               ),
        //               elevation: 0);
        //         }),
        //   ),
        // ),
        Positioned(
            bottom: 30,
            child: SizedBox(
              height: 50,
              width: 600,
              child: Container(
                color: Colors.grey,
              ),
            )),
        Positioned(
          bottom: 30,
          child: SizedBox(
            height: 50,
            width: 300,
            child: SizedBox(
                child: LinearProgressIndicator(
              value: progress,
              minHeight: 40,
              backgroundColor: Colors.grey[300],
              valueColor: AlwaysStoppedAnimation<Color>(Colors.green),
            )),
          ),
        )
      ]),
    );
  }
}

class EventHandler extends Observer {
  PlayState state;
  Function callback;
  EventHandler({required this.state, required this.callback}) {
    BluetoothModule.instance.add(this);
    BluetoothModule.instance.init();
    WebSocketsController.instance.add(this);
    WebSocketsController.instance.initWebSocket();
  }

  @override
  void update(args) {
    if (args != "close") {
      switch (args['type']) {
        case 'bluetooth':
          // print("bluetooth event!");
          this.state.totalSteps += args['steps'] as int;
          this.state.current = Util.translateNewPoint(
              state.path, state.current, Util.stepToDistance(state.totalSteps));
          var data = json.encode({
            "type": "UpdateSession",
            "id": state.id,
            "data": {
              "id": state.id,
              "nStep": args['steps'],
              "nPos": state.current.toJson()
            },
            "user": Profile.local.toJson(),
          });
          WebSocketsController.instance.sendMessage(data);
          callback(this.state);
          break;
        case 'websocket':
          var raw = args['body']['data'];
          var user = Profile.fromJson(args['body']['user']);
          if (user.id != Profile.local.id) {
            this.state.current = raw['nPos'];
            this.state.totalSteps = raw['nStep'];
          }
          callback(this.state);
          break;
      }
    }
  }
}
