//todo add socket and querring
import 'dart:async';
import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:dio/dio.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

enum Endpoints {
  Create,
  List_Available,
  Enter_Session,
}

class WebSocketsController extends Subject {
  static WebSocketsController instance = WebSocketsController();
  bool connected = false;
  late WebSocketChannel channel;


  Future<void> initWebSocket() async {
    await dotenv.load(fileName: 'lib/.env');
    String? uri = dotenv.env['WS_ENDPOINT'];
    if (uri == null )throw Exception("could not establish connection!, not a valid url provided in .env WS_ENDPOINT?");
    if(!this.connected) {
      channel = WebSocketChannel.connect(Uri.parse(uri));
      connected = true;
    }
  }


  WebSocketsController(){
      this.setupSockets();
    }

    Future<void> setupSockets() async {
      await initWebSocket();
      channel.stream.listen((m) => this.run({'body': json.decode(m), 'type':'websocket'}));
    }

    void sendMessage(String message){
    // print("websocket sending:");
    // print(message);
      if(this.connected)
      channel.sink.add(message);
      else
        initWebSocket();
    }
    void closeConnection(){
      channel.sink.close();
      this.connected = false;
    }
}

class ApiCalls {
  static Future<dynamic>? getDirectionApi(LatLng start, LatLng end) async {
    //todo add path
    await dotenv.load(fileName: 'lib/.env');
    String? url = dotenv.env['MAPBOX_API_DIR_ENDPOINT'];

    if (url == null) {
      throw Exception(
          "Direction API endpoint is missing in the .env file! please add in .env ");
    }
    String? api = dotenv.env['MAPBOX_API_KEY'];
    if (api == null) {
      throw Exception("Direction API key is missing in the .env file!");
    }

    url = url +
        start.longitude.toString() +
        ',' +
        start.latitude.toString() +
        ';' +
        end.longitude.toString() +
        ',' +
        end.latitude
            .toString(); //todo add multiple waypoints, and support functions
    url = Uri.encodeFull(url);

    try {
      final req = await Dio().get(url, queryParameters: {
        'alternatives': false,
        'geometries': 'polyline',
        'steps': false,
        'access_token': api
      });
      if (req.statusCode == 200) {
        return req.data;
      } else if (req.statusCode == 404) {
        throw Exception(
            'ProfileNotFound, the provided profile was wrong: ${url}');
      } else if (req.statusCode == 422) {
        throw Exception('InvalidInput, the provided ${url} was invalid');
      }
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<dynamic>? getAppAPI(
      {required String endpoint, String? id}) async {
    await dotenv.load(fileName: 'lib/.env');
    String? url = dotenv.env['API_ENDPOINT'];
    if (url == null) {
      throw Exception(
          "API endpoint is missing in the .env file! please add in .env ");
    }
    url = url + endpoint;
    if (id != null) url = url + id;
    // print("calling $url");
    try {
      final req = await Dio().get(Uri.parse(url).toString());
      if (req.statusCode == 200) {
        // print('got response: ${req.data}');
        return req.data;
      } else
        throw Exception("Request failed!");
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<dynamic>? postAppAPI(String endpoint, dynamic data) async {
    await dotenv.load(fileName: 'lib/.env');
    String? url = dotenv.env['API_ENDPOINT'];
    if (url == null) {
      throw Exception(
          "API endpoint is missing in the .env file! please add in .env ");
    }
    url = url + endpoint;

    try {
      final req = await Dio().post(url, data: data);
      if (req.statusCode == 200)
        return req.data;
      else
        throw Exception("Request failed!");
    } catch (e) {
      // print(e);
      return null;
    }
  }


  static Future<dynamic>? putAppAPI(String endpoint, dynamic data) async {
    await dotenv.load(fileName: 'lib/.env');
    String? url = dotenv.env['API_ENDPOINT'];
    if (url == null) {
      throw Exception(
          "API endpoint is missing in the .env file! please add in .env ");
    }
    url = url + endpoint;

    try {
      final req = await Dio().put(url, data: data);
      if (req.statusCode == 200)
        return req.data;
      else
        throw Exception("Request failed!");
    } catch (e) {
      // print(e);
      return null;
    }
  }
}
