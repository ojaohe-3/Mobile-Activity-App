//todo

import 'dart:async';
import 'dart:math';

import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';

class BluetoothModule extends Subject{
  static BluetoothModule instance = BluetoothModule();
  List<String>? listDevices(){}
  late Timer timer;
  bool active = false;
  BluetoothModule() : super();
  bool isConnected(){return false;}
  void init() {
    var r = Random();
    active = true;
    timer = Timer.periodic(Duration(seconds: (10.0 * r.nextDouble()).ceil() + 1),
            (Timer t) => callback(t));
    //todo start reading from device... provided it already is connected
  }
  void dispose(){
    timer.cancel();
    active = false;
  }
  void callback(Timer t){
    var r = Random();
    process({'type': 'bluetooth', 'steps': r.nextInt(100)});
    if(!this.active)
      t.cancel();

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