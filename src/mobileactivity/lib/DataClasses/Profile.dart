import 'package:mobileactivity/modules/filesystem.module.dart';
import 'package:mobileactivity/modules/networking.monule.dart';

class Profile {
  String name;
  String oid;
  final String id;

  static Profile local =
      Profile(name: "default", oid: "000000000000", id: "000000000000");
  Profile({required this.name, required this.oid, required this.id}) {
    createInstance();
  }
  factory Profile.fromJson(Map<String, dynamic> json) => Profile(
        oid: json['oid'],
        name: json['name'],
        id: json['id'],
      );

  Map<String, dynamic> toJson() => {
        'id': this.id,
        'name': this.name,
        'oid': this.oid,
      };

  Future<void> update({String? name, String? oid}) async {
    if (name != null) this.name = name;
    if (oid != null) this.oid = oid;
    FileModule.writeDataToFile('local_profile.json', this.toJson());
    await ApiCalls.postAppAPI('profile', Profile.local.toJson());
  }

  static Future<void> createInstance() async {
    if (await FileModule.fileExist('local_profile.json')) {
      var raw = await FileModule.loadData('local_profile.json');
      print(raw);
      if (raw != null) {
        Profile.local = Profile.fromJson(raw);
        await ApiCalls.postAppAPI('profile', Profile.local.toJson());
      }
    } else {
      Profile.local =
          Profile(name: "default", oid: "000000000000", id: "000000000000");
    }
  }
}
