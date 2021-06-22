
import 'package:flutter/material.dart';
import 'package:mobileactivity/widgets/Header.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( //todo, fix a statless widget for the header
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
                  Navigator.pushNamed(context, '/map');
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
                onPressed: (){
                  Navigator.pushNamed(context, '/setup');
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
                child: const Text('Device'),
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
