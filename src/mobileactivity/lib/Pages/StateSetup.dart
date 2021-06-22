import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class StateSetup extends StatefulWidget {
  const StateSetup({Key? key}) : super(key: key);

  @override
  _StateSetupState createState() => _StateSetupState();
}

class _StateSetupState extends State<StateSetup> {
  String? title;

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
        ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [

        ],
      ),
    );
  }
}
