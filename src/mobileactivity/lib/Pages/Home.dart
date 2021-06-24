
import 'package:flutter/material.dart';
import 'package:mobileactivity/DataClasses/PlayState.dart';
import 'package:mobileactivity/widgets/Header.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  PlayState? state;
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
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: (){
                  if(this.state != null)
                    Navigator.pushNamed(context, '/setup/state', arguments: state);
                },
                style: TextButton.styleFrom(
                    textStyle: const TextStyle(fontSize: 20)
                ),
                child: const Text('Continue Session'),
              ),

            ],
          ),
          SizedBox(height: 50,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: () async {
                  state = await Navigator.pushNamed(context, '/setup') as PlayState;
                },
                style: TextButton.styleFrom(
                    textStyle: const TextStyle(fontSize: 20)
                ),
                child: const Text('New Session'),
              ),

            ],
          ),
          SizedBox(height: 50,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: (){
                  Navigator.pushNamed(context, '/statistics');
                },
                style: TextButton.styleFrom(
                    textStyle: const TextStyle(fontSize: 20)
                ),
                child: const Text('Statistics'),
              ),

            ],
          ),
          SizedBox(height: 50,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: (){},
                style: TextButton.styleFrom(
                    textStyle: const TextStyle(fontSize: 20)
                ),
                child: const Text('Profile'),
              ),
            ],
          ),
        ],
      ),
      floatingActionButton: IconButton(
        onPressed: () {  },
        icon: Icon(Icons.settings)
      ),
    );
}
}
