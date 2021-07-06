
import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class OrgLoad extends StatefulWidget {
  const OrgLoad({Key? key}) : super(key: key);

  @override
  _OrgLoadState createState() => _OrgLoadState();
}

class _OrgLoadState extends State<OrgLoad> {
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
