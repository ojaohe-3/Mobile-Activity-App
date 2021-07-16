import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

class FileModule{
  static void writeDataToFile(String fn, Map<String, dynamic> data) async{
    Directory appDir = await getApplicationDocumentsDirectory();
    var dir = appDir.path;
    File file = File('$dir/$fn');
    bool exist = await file.exists();
    if(!exist) await file.create();
    file.writeAsString(json.encode(data));

  }

  static Future<bool> fileExist(String fn) async {
    Directory appDir = await getApplicationDocumentsDirectory();
    var dir = appDir.path;
    File file = File('$dir/$fn');
    return await file.exists();
  }

  static void appendDataToFile(String fn, Map<String, dynamic> data) async{
    Directory appDir = await getApplicationDocumentsDirectory();
    var dir = appDir.path;
    File file = File('$dir/$fn');
    bool exist = await file.exists();
    dynamic collection;
    if(!exist) await file.create();
    else {
      collection = await FileModule.loadData(fn);
    }

    var sink = file.openWrite();
    sink.writeln("{\n\t body:\n\t\t[");
    if(collection != null){
      for (dynamic item in (collection['body'] as List<dynamic>)){
        sink.writeln(json.encode(item));
      }
    }
    sink.write(json.encode(data));
    sink.write("] }");
    sink.close();

  }

  static dynamic loadData(String fn) async{
    Directory appDir = await getApplicationDocumentsDirectory();
    var dir = appDir.path;
    File file = File('$dir/$fn');
    bool exist = await file.exists();
    if(!exist) return null;

    try {
      var data = await file.readAsString();
      return json.decode(data);
    }catch (e) {
      print(e);
    }
  }
}