import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class StateDisplay extends StatefulWidget {
  const StateDisplay({Key? key}) : super(key: key);

  @override
  _StateDisplayState createState() => _StateDisplayState();
}

class _StateDisplayState extends State<StateDisplay> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Header(),
          iconTheme: IconThemeData(
              color: Colors.blue[900]
          ),
          centerTitle: true,
          backgroundColor: Colors.white,
        ));
  }
}
