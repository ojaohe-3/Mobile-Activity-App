import 'package:flutter/material.dart';
import 'package:mobileactivity/Pages/Home.dart';
import 'package:mobileactivity/Pages/Map.dart';
import 'package:mobileactivity/Pages/Settings.dart';
import 'package:mobileactivity/Pages/StateSetup.dart';
import 'package:mobileactivity/Pages/StateSetupDisplay.dart';
import 'package:mobileactivity/Pages/Statistics.dart';

import 'Pages/Loading.dart';
import 'Pages/RoomSelection.dart';

void main() {
  runApp(MaterialApp(
      initialRoute: '/home',
    routes:
      { //todo all generated examples, maintain its path name for convention.
        '/': (context) => Loading(),
        '/home': (context) => Home(),
        '/setup': (context) => StateSetup(),
        '/setup/state': (context) => StateDisplay(),
        '/room/select': (context) => RoomSelection(),
        '/map': (context) => GMap(),
        '/settings': (context) => Settings(),
        '/statistics': (context) => StatisticDisplay(),
      }

  ));
}


