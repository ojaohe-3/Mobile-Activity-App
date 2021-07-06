import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class LoadSelect extends StatefulWidget {
  const LoadSelect({Key? key}) : super(key: key);

  @override
  _LoadSelectState createState() => _LoadSelectState();
}

class _LoadSelectState extends State<LoadSelect> {
  List<dynamic> _sessions = List.empty();
  @override
  Future<void> initState() async {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(
            color: Colors.blue[900]
        ),
        centerTitle: true,
        backgroundColor: Colors.white70,
      ),
    );
  }
}
