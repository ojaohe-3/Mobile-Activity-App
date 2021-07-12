import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/DataClasses/Profile.dart';
import 'package:mobileactivity/modules/bluetooth.module.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/widgets/Header.dart';

class GMap extends StatefulWidget {
  const GMap({Key? key}) : super(key: key);
  @override
  _GMapState createState() => _GMapState();
}

class _GMapState extends State<GMap> implements Observer {
  late PlayState _state;
  late CameraPosition _initPos;
  late CameraTargetBounds _initBound;
  late GoogleMapController _googleMapController;


  Marker? _start;
  Marker? _end;
  Marker? _current;

  List<Profile> profiles = List.empty(growable: true);
  @override
  void initState() {
    //todo ask premission from the user if we need to setup device, then if
    // BluetoothModule.instance.init();
    // BluetoothModule.instance.add(this);
    WebSocketsController.instance.add(this!);
    //todo at bluetooth event,
    super.initState();
  }



  @override
  void dispose() {
    this._googleMapController.dispose();
    super.dispose();
  }

  Future<void> setProfiles(String id) async {
    this.profiles = await ApiCalls.getAppAPI(endpoint: 'session/$id/members/');
  }

  @override
  Widget build(BuildContext context) {
    _state = ModalRoute.of(context)!.settings.arguments as PlayState;
    setProfiles(_state.id);
    _initPos = CameraPosition(
        target: _state.current, zoom: 12); //todo set zoom translation
    _initBound = CameraTargetBounds(_state.bounds);
    _start = Marker(markerId: MarkerId('start'), position: _state.start);
    _end = Marker(markerId: MarkerId('end'), position: _state.end);
    _current = Marker(markerId: MarkerId('current'), position: _state.current);
    return Scaffold(
        appBar: AppBar(
          title: Header(),
          iconTheme: IconThemeData(color: Colors.blue[900]),
          centerTitle: true,
          backgroundColor: Colors.white70,
        ),
        body: Stack(children: [
          GoogleMap(
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            initialCameraPosition: _initPos,
            onMapCreated: (controller) => _googleMapController = controller,
            markers: {
              if (_start != null) _start!,
              if (_end != null) _end!,
              if (_current != null) _current!,
            },
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
          SizedBox(
            height: 100,
            width: 200,
            child: ListView.builder(
                itemCount: this.profiles.length,
                itemBuilder: (context, index) {
                  return Card(
                      child: ListTile(
                        leading: CircleAvatar(backgroundColor: Colors.amber),
                        title: Text(this.profiles[index].name + ": steps here"),
                      ),
                      elevation: 0);
                }),
          )
        ]));
  }

  @override
  void update(args) {
    if(args != "close"){

    }
  }
}

