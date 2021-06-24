import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/widgets/Header.dart';

class StateSetup extends StatefulWidget {
  const StateSetup({Key? key}) : super(key: key);

  @override
  _StateSetupState createState() => _StateSetupState();
}

class _StateSetupState extends State<StateSetup> {
  TextEditingController _titleText = TextEditingController();
  String _visibility = "Private";
  PointSelection? _mapData;

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
                setState(() {
                  _visibility = newValue!;
                });
              },
              items: <String>['Private', 'Public', 'Your Organization']
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
                  ? () => Navigator.of(context).pop(PlayState(
                      this._mapData!.start,
                      this._mapData!.end,
                      'source',
                      this._mapData!.polyLine,
                      _titleText.text.toString()))
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
