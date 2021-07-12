
import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class StatisticDisplay extends StatefulWidget {
  const StatisticDisplay({Key? key}) : super(key: key);

  @override
  _StatisticDisplayState createState() => _StatisticDisplayState();
}

class _StatisticDisplayState extends State<StatisticDisplay> {
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
