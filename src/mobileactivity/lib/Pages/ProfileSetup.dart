import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/Profile.dart';
import 'package:mobileactivity/DataClasses/org.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/widgets/Header.dart';

class ProfileSetup extends StatefulWidget {
  const ProfileSetup({Key? key}) : super(key: key);

  @override
  _ProfileSetupState createState() => _ProfileSetupState();
}

class _ProfileSetupState extends State<ProfileSetup> {
  TextEditingController _nameInput = TextEditingController();
  Profile _profile = Profile.local;
  Org? _org;
  @override
  void dispose() {
    _nameInput.dispose();
    super.dispose();
  }

  @override
  void initState() {
    getItems();
    super.initState();
  }
  Future<void> getItems() async {
    var raw =
        await ApiCalls.getAppAPI(endpoint: 'organization/${_profile.oid}');
    _org = Org.fromJson(raw);
    setState(() {

    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Header(),
        iconTheme: IconThemeData(color: Colors.blue[900]),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          TextField(
            controller: _nameInput,
            decoration: InputDecoration(hintText: _profile.name),
            onSubmitted: (text) {
              print(text);
              print(_nameInput.text);
              Profile.local.update(name: text);
            },
          ),
          Card(
            elevation: 1,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                CircleAvatar(
                  backgroundColor: Colors.blue,
                ),
                Text(_org != null ? _org!.name : "..."),
                FloatingActionButton(
                    child: Icon(Icons.create),
                    onPressed: () async {
                      _org = await Navigator.pushNamed(context, "/select/org")
                          as Org;
                      if(_org != null)
                        Profile.local.update(oid: _org!.id);
                    },)
              ],
            ),
          )
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Profile.local = _profile;
          Navigator.pop(context, _profile);
        },
      ),
    );
  }
}
