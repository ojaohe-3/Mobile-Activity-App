import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/modules/filesystem.module.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/modules/utilities.module.dart';
import 'package:mobileactivity/widgets/Header.dart';
import 'package:uuid/uuid.dart';

class StateSetup extends StatefulWidget {
  const StateSetup({Key? key}) : super(key: key);

  @override
  _StateSetupState createState() => _StateSetupState();
}

class _StateSetupState extends State<StateSetup> {
  TextEditingController _titleText = TextEditingController();
  String _visibility = "Private";
  PointSelection? _mapData;
  List<String> _orgs = List.empty();

  var uuid = Uuid();
  bool publish = false;
  Org _org = Org(id: "1", name: "Unassigned", members: [], ); //todo add default member as local user.

  Future<dynamic>? createAlert(context) {
    return showDialog(context: context,
        builder: (context) => AlertDialog(
              content: Text("Confirm session?"),
              actions: [
                IconButton(
                    onPressed: () =>
                        Navigator.of(context).pop({'confirm': false}),
                    icon: Icon(Icons.cancel_outlined)),
                IconButton(
                    onPressed: () =>
                        Navigator.of(context).pop({'confirm': true}),
                    icon: Icon(Icons.add))
              ],
            ));
  }
  @override
  void dispose(){
    this._titleText.dispose();
    super.dispose();
  }
  @override
  Future<void> initState() async {
    this._orgs = await createOrgList();
    super.initState();
  }

  Future<List<String>> createOrgList() async{
    var data = await ApiCalls.getAppAPI(api : APIs.Organization) as List<dynamic>
    data.
  }

  @override
  Widget build(BuildContext context) {
        return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(color: Colors.blue[900]),
        centerTitle: true,
        backgroundColor: Colors.white70,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Center(
            child: Text('Title', style: TextStyle(color: Colors.blue[900])),
          ),
          Center(
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 10, horizontal: 100),
              child: TextField(
                controller: _titleText,
                maxLength: 50,
              ),
            ),
          ),
          SizedBox(
            height: 10,
          ),
          Text('Visibility'),
          Center(
            child: DropdownButton(
              icon: const Icon(Icons.arrow_downward),
              iconSize: 24,
              elevation: 16,
              style: TextStyle(color: Colors.blue[900]),
              underline: Container(
                height: 2,
                color: Colors.deepPurpleAccent,
              ),
              value: _visibility,
              onChanged: (String? newValue) {
                setState(() async {
                  _visibility = newValue!;
                  switch(_visibility){
                    case 'Private':
                      this.publish = false;
                      break;
                    case 'Public':
                      this.publish = true;
                      this._org = await ApiCalls.getAppAPI(api: APIs.Organization, id: '1001') as Org;
                      break;
                    default:
                      this._org = await ApiCalls.getAppAPI(api:  APIs.Organization, id : newValue); //todo this is jucky fix
                  }
                });
              },
              items: <String>['Private', 'Public', ...this._orgs]
                  .map<DropdownMenuItem<String>>((String e) {
                return DropdownMenuItem<String>(value: e, child: Text(e));
              }).toList(),
            ),
          ),
          SizedBox(
            height: 10,
          ),
          ElevatedButton(
              onPressed: () async {
                _mapData = await Navigator.pushNamed(context, '/setup/map')
                    as PointSelection;
                setState(() {
                  _mapData;
                });
              },
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                child: Text(
                  'Add Points',
                  style: TextStyle(color: Colors.blue[900]),
                ),
              )),
          ElevatedButton(
              onPressed: (this._mapData != null)
                  ? () async {
                        var state = PlayState(
                            start: _mapData!.start,
                            end: _mapData!.end,
                            path: _mapData!.polyLine,
                            id: uuid.v4(),
                            title: _titleText.text.toString(),
                            totalSteps: 0,
                            current: _mapData!.start,
                            bounds: Util.generateBounds(
                                _mapData!.start, _mapData!.end, 0.2),
                            distance: _mapData!.distance,
                            org: _org);
                        FileModule.writeDataToFile("local_state_last.json", state);
                        FileModule.appendDataToFile("local_state.json", state);
                        ApiCalls.postAppAPI(APIs.Session, state); //todo translate this into a format that the api can use
                        Navigator.of(context).pop(state);
                      }
                  : null,
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                child: Text(
                  'Save',
                  style: TextStyle(color: Colors.blue[900]),
                ),
              ))
        ],
      ),
    );
  }
}
