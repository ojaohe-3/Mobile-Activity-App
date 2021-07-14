import 'package:mobileactivity/modules/filesystem.module.dart';
import 'package:mobileactivity/modules/networking.monule.dart';

//todo caching
class Profile {
  String name;
  String oid;
  String id;

  bool isInit(){
    return this.id != "000000000000";
  }

  static Profile local =
      Profile(name: "default", oid: "000000000000", id: "000000000000");
  Profile({required this.name, required this.oid, required this.id});

  factory Profile.fromJson(Map<String, dynamic> json) => Profile(
        oid: json['oid'],
        name: json['name'],
        id: json['_id'],
      );

  Map<String, dynamic> toJson() => {
        '_id': this.id,
        'name': this.name,
        'oid': this.oid,
      };

  Future<void> update({String? name, String? oid}) async {
    if (name != null) this.name = name;
    if (oid != null) {
      this.oid = oid;
      await ApiCalls.putAppAPI("profile/${this.id}/", this.toJson());
      await ApiCalls.postAppAPI("organization/${this.oid}/members", this.toJson());
    }
    FileModule.writeDataToFile('profile_local.json', this.toJson());
  }

  static Future<void> createInstance() async {
    if (await FileModule.fileExist('profile_local.json')) {
      var raw = await FileModule.loadData('profile_local.json');
      if (raw != null) {
        Profile.local = Profile.fromJson(raw);

        if(!Profile.local.isInit()) {
          Profile.generate();
        }
      }
    } else {
      Profile.generate();
    }
    FileModule.writeDataToFile('profile_local.json', Profile.local.toJson());

  }

  static Future<void> generate() async {
    var raw = await ApiCalls.getAppAPI(endpoint: "profile/create");
    Profile.local = Profile.fromJson(raw);
  }
}
