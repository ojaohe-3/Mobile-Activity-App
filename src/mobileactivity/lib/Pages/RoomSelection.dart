import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';
class RoomSelection extends StatefulWidget {
  const RoomSelection({Key? key}) : super(key: key);

  @override
  _RoomSelectionState createState() => _RoomSelectionState();
}

class _RoomSelectionState extends State<RoomSelection> {
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

