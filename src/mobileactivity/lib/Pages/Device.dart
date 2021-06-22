
import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class DeviceSelection extends StatefulWidget {
  const DeviceSelection({Key? key}) : super(key: key);

  @override
  _DeviceSelectionState createState() => _DeviceSelectionState();
}

class _DeviceSelectionState extends State<DeviceSelection> {
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
