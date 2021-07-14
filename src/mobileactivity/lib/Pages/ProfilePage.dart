import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/Profile.dart';
import 'package:mobileactivity/DataClasses/org.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/widgets/Header.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Profile _profile = Profile.local;
  Org? _org;

  @override
  void initState() {
    getItems();
    super.initState();
  }

  Future<void> getItems() async {
    await Profile.createInstance();
    var raw =
        await ApiCalls.getAppAPI(endpoint: 'organization/${_profile.oid}');
    setState(() {
      _org = Org.fromJson(raw);
      _profile = Profile.local;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(color: Colors.blue[900]),
        centerTitle: true,
        backgroundColor: Colors.white70,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Card(
                child: Text(
              "name: ${_profile.name}",
              style: TextStyle(fontSize: 20),
            )),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Card(

                child: Text(
              "ID: ${_profile.id}",
              style: TextStyle(fontSize: 20),
            )),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Card(
                child: Text(
              "Member of: ${_org != null ? _org!.name : "loading.."}",
              style: TextStyle(fontSize: 20),
            )),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.of(context).pushNamed("/create/profile");
          setState(() {

          });
        },
        child: Icon(Icons.create),
      ),
    );
  }
}
