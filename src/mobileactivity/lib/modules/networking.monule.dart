//todo add socket and querring
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:dio/dio.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobileactivity/DataClasses/EventObserverPattern.dart';

enum Endpoints{
  Create, List_Available, Enter_Session,
}

class Sockets extends Subject{}

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
        end.latitude.toString(); //todo add multiple waypoints, and support functions
    url = Uri.encodeFull(url);

    try {
      final req = await Dio().get(url, queryParameters: {
        'alternatives' : false,
        'geometries': 'polyline',
        'steps' : false,
        'access_token' : api
      });
      if (req.statusCode == 200) {
        return req.data;
      } else if (req.statusCode == 404) {
        throw Exception(
            'ProfileNotFound, the provided profile was wrong: ${url}');
      } else if (req.statusCode == 422) {
        throw Exception(
            'InvalidInput, the provided ${url} was invalid');
      }
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<dynamic?> getFromSessionAPI(dynamic data) async {
      String? url = await dotenv.env['ERGO_API_CREATE_SESSION_ENDPOINT'];
      try{

      }catch(e){
        print(e);
        return null;
      }
  }


}
