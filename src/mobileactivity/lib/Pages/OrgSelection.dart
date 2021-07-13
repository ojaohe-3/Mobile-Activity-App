import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/org.dart';
import 'package:mobileactivity/modules/networking.monule.dart';
import 'package:mobileactivity/widgets/Header.dart';

class OrgSelector extends StatefulWidget {
  const OrgSelector({Key? key}) : super(key: key);

  @override
  _OrgSelectorState createState() => _OrgSelectorState();
}

class _OrgSelectorState extends State<OrgSelector> {
  List<Org> _orgs = List.empty(growable: true);
  @override
  void initState() {
    getItems();
    super.initState();
  }

  Future<void> getItems() async {
    var raw =
        await ApiCalls.getAppAPI(endpoint: 'organization/all') as List<dynamic>;

    setState(() {
      raw.forEach((element) {
        _orgs.add(Org.fromJson(element));
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Header(),
          iconTheme: IconThemeData(
              color: Colors.blue[900]
          ),
          centerTitle: true,
          backgroundColor: Colors.white70,
        ),
        body: ListView.builder(
            itemCount: _orgs.length,
            padding: const EdgeInsets.all(8),
            itemBuilder: (context, index) {
              return Card(
                elevation: 5,
                child: ListTile(
                  title: Text(
                      "${_orgs[index].name} \n ${_orgs[index].members.length} members"),
                  onTap: () {
                    Navigator.pop(context, _orgs[index]);
                  },
                ),
              );
            }));
  }
}
