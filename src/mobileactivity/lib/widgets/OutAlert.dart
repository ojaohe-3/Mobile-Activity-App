import 'package:flutter/material.dart';

class OutAlert extends StatefulWidget { //todo rename to something better
  const OutAlert({Key? key, required this.controllerTitle, required this.controllerDesc}) : super(key: key);
  final TextEditingController controllerTitle;
  final TextEditingController controllerDesc;
  @override
  _OutAlertState createState() => _OutAlertState(controllerTitle, controllerDesc);
}

class _OutAlertState extends State<OutAlert> {
  TextEditingController _text1;
  TextEditingController _text2;

  _OutAlertState(this._text1, this._text2);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children:[

            Text("Name of the route",
              style: TextStyle(fontSize: 20),
            ),
            Text("This will be what identifies it to others",
              style: TextStyle(
                fontSize: 10,
              ),
            ),

            TextField(
                autocorrect: true,
                maxLength: 40,
                controller: _text1,
                decoration: InputDecoration(hintText: 'title')
            ),
          SizedBox(height: 10),

          Text("Description",
              style: TextStyle(fontSize: 20),
            ),
            Text("a short description",
              style: TextStyle(
                fontSize: 10,
              ),
            ),
            TextField(
                autocorrect: true,
                maxLength: 200,
                controller: _text2,
                decoration: InputDecoration(hintText: 'description')
            ),
          ]
      ),
    );
  }
}