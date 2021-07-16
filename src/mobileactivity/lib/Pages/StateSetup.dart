
import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/DataClasses/org.dart';
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
  Org? _org;
  var uuid = Uuid();
  bool publish = false; //todo

  Future<dynamic>? createAlert(context) {
    return showDialog(
        context: context,
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
  void dispose() {
    this._titleText.dispose();
    super.dispose();
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
                  switch (_visibility) {
                    case 'Private':
                      this.publish = false;
                      this._org = Org(name: "unassinged", id: "", members: []);
                      break;
                    case 'Public':
                      this.publish = true;
                      this._org = Org(name: "unassinged", id: "", members: []);
                      break;
                    case 'Select':
                      this._org = await Navigator.of(context)
                          .pushNamed('/select/org') as Org;
                      this.publish = true;
                  }
                  setState(() {

                  });
                });
              },
              items: <String>['Private', 'Public', 'Select']
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
                setState(() {});
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
              onPressed: (this._mapData != null && this._org != null)
                  ? () async {
                  print(" ==================== GENERATE STATE ====================");
                      var state = PlayState(
                          start: _mapData!.start,
                          end: _mapData!.end,
                          path: _mapData!.polyLine,
                          id: uuid.v4(), //placeholder
                          title: _titleText.text.toString(),
                          totalSteps: 0,
                          current: _mapData!.start,
                          bounds: Util.generateBounds(
                              _mapData!.start, _mapData!.end, 0.2),
                          distance: _mapData!.distance,
                          name: _titleText.text,
                          orgId: _org!.id);


                      var raw = await ApiCalls.postAppAPI('session',
                          state);
                      state.id = raw['data']['_id']; //this assigns the correct id
                      print(state.id);
                      FileModule.writeDataToFile(
                          "local_state.json", state.toJson());
                      // FileModule.appendDataToFile("local_state.json", state.toJson()); //caching todo
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
