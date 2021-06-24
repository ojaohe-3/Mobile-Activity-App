//todo

import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';

class BluetoothModule extends Subject{
  static BluetoothModule instance = BluetoothModule();
  List<String>? listDevices(){}

  BluetoothModule() : super();
  bool isConnected(){return false;}
  void init() {
    //todo start reading from device... provided it already is connected
  }
  void process(){
    //todo concurrently run onto devices
  }
  void setDevice(){
    //todo
  }
}