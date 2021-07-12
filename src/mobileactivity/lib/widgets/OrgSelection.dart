
import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/org.dart';
import 'package:mobileactivity/modules/networking.monule.dart';

class OrgSelector extends StatefulWidget {
  const OrgSelector({Key? key}) : super(key: key);

  @override
  _OrgSelectorState createState() => _OrgSelectorState();
}

class _OrgSelectorState extends State<OrgSelector> {
  List<Org> _orgs = List.empty();
  @override
  void initState() {
    getItems();
    super.initState();
  }
  Future<void> getItems() async {
    var raw = await ApiCalls.getAppAPI(endpoint: 'organization') as List<dynamic>;
    raw.forEach((element) { _orgs.add(Org.fromJson(element));});
    setState(() {

    });
  }
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: _orgs.length,
        itemBuilder: (context, index){
            return Card(
              elevation: 5,
              child: ListTile(
                title: Text("${_orgs[index].name} \n ${_orgs[index].members.length} members"),
                onTap: (){
                  Navigator.pop(context, _orgs[index]);
                },
              ),
            );
        });
  }
}
