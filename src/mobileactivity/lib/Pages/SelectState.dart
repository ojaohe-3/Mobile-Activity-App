import 'dart:math';

import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/widgets/Header.dart';

class SelectState extends StatefulWidget {
  const SelectState({Key? key}) : super(key: key);

  @override
  _SelectStateState createState() => _SelectStateState();
}

class _SelectStateState extends State<SelectState> {
  List<dynamic> _sessions = List.empty(growable: true);
  @override
  void initState() {
    getItems();
    super.initState();
  }

  Future<void> getItems() async {
    _sessions = await ApiCalls.getAppAPI(endpoint: 'session/');
    setState(() {

    });
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
      body: ListView.builder(
          itemCount: _sessions.length,
          itemBuilder: (context, i){
            return Card(
              child: ListTile(
                onTap: (){
                  PlayState _state = PlayState.fromJson(_sessions[i]);
                  Navigator.of(context).pushNamed('/map', arguments:  _state);
                },
                leading: CircleAvatar(
                  backgroundColor: Colors.blue,
                  radius: 15,
                ),
              ),
            );
          })
    );
  }
}
//todo this page will have a list view of all available sessions it can join. Selecting will save its source