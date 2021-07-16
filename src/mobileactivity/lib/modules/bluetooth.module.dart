//todo

import 'dart:async';
import 'dart:math';

import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';

class BluetoothModule extends Subject{
  static BluetoothModule instance = BluetoothModule();
  List<String>? listDevices(){}

  BluetoothModule() : super();
  bool isConnected(){return false;}
  void init() {
    var r = Random();
    new Timer(new Duration(milliseconds: (1000.0 * r.nextDouble()).ceil() + 1),
            () => process({'type': 'bluetooth', 'steps': r.nextInt(100)}));
    //todo start reading from device... provided it already is connected
  }
  void process(dynamic data){
    print("step:");
    print(data);
    run(data);
    //todo concurrently run onto devices
  }
  void setDevice(){
    //todo
  }
}