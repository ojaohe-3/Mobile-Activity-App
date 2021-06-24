

import 'package:flutter/cupertino.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';

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
      child: Text('placeholder'),
    );
  }
}
//todo this progress bar, will span its entire tile/container and will draw a progress bar based on state.