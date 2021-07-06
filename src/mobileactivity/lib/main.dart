import 'package:flutter/material.dart';
import 'package:mobileactivity/Pages/Home.dart';
import 'package:mobileactivity/Pages/Map.dart';
import 'package:mobileactivity/Pages/OrgLoad.dart';
import 'package:mobileactivity/Pages/SelectLoader.dart';
import 'package:mobileactivity/Pages/Settings.dart';
import 'package:mobileactivity/Pages/StateSetupMap.dart';
import 'package:mobileactivity/Pages/StateSetupDisplay.dart';
import 'package:mobileactivity/Pages/Statistics.dart';

import 'Pages/StateSetup.dart';
import 'Pages/SelectState.dart';

void main() {
  runApp(MaterialApp(
      //todo make automatic mapping from blueprints factory pattern
      initialRoute: '/home',
    routes:
      { //todo all generated examples, maintain its path name for convention.
        '/': (context) => StateSetup(),
        '/home': (context) => Home(),
        '/setup': (context) => StateSetup(),
        '/setup/map': (context) => StateSetupMap(),
        '/setup/state': (context) => StateDisplay(),
        '/room/select': (context) => SelectState(),
        '/room/select/load': (context) => LoadSelect(),
        '/setup/state/load': (context) => OrgLoad(),
        '/map': (context) => GMap(),
        '/settings': (context) => Settings(),
        '/statistics': (context) => StatisticDisplay(),
      }

  ));
}


