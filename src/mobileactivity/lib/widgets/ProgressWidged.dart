

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/modules/utilities.module.dart';

class ProgressWidget extends StatefulWidget {
  const ProgressWidget({Key? key, required this.state}) : super(key: key);
  final PlayState state;
  @override
  _ProgressWidgetState createState() => _ProgressWidgetState(this.state);
}

class _ProgressWidgetState extends State<ProgressWidget> {
  final PlayState _state;

  _ProgressWidgetState(this._state);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: SizedBox(child: LinearProgressIndicator(
        value: distanceRemaining(),
        minHeight: 40,
        backgroundColor: Colors.grey[300],
        valueColor: AlwaysStoppedAnimation<Color>(
          Colors.green
        ),
      )),
    );
  }

  double distanceRemaining() {
    var dist = Util.stepToDistance(_state.totalSteps);
    return dist/_state.distance;
  }
}
//todo this progress bar, will span its entire tile/container and will draw a progress bar based on state.