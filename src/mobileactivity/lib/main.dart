import 'package:flutter/material.dart';
import 'package:mobileactivity/Pages/Home.dart';
import 'package:mobileactivity/Pages/Map.dart';
import 'package:mobileactivity/Pages/ProfilePage.dart';
import 'package:mobileactivity/Pages/ProfileSetup.dart';
import 'package:mobileactivity/Pages/Settings.dart';
import 'package:mobileactivity/Pages/StateSetupMap.dart';
import 'package:mobileactivity/Pages/StateSetupDisplay.dart';
import 'package:mobileactivity/Pages/Statistics.dart';
import 'package:mobileactivity/Pages/OrgSelection.dart';

import 'Pages/StateSetup.dart';
import 'Pages/SelectState.dart';

void main() {
  runApp(MaterialApp(
      //todo make automatic mapping from blueprints factory pattern
      initialRoute: '/',
    routes:
      { //todo all generated examples, maintain its path name for convention.
        '/': (context) => Home(),
        '/setup': (context) => StateSetup(),
        '/setup/map': (context) => StateSetupMap(),
        '/setup/state': (context) => StateDisplay(),
        '/room/select': (context) => SelectState(),
        '/select/org': (context) => OrgSelector(),
        '/profile': (context) => ProfilePage(),
        '/create/profile': (context) => ProfileSetup(),
        '/map': (context) => GMap(),
        '/settings': (context) => Settings(),
        '/statistics': (context) => StatisticDisplay(),
      }

  ));
}


