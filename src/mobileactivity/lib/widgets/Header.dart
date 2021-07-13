import 'package:flutter/material.dart';

class Header extends StatelessWidget {
  const Header({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
    mainAxisAlignment: MainAxisAlignment.end,
    children: [
              // BackButton(
              //   onPressed: (){},
              //   color: Colors.blue[900],
              // ),
              Image.asset('assets/alter-ergo-logo.png', fit: BoxFit.contain, height: 40,
            )]);
  }
}
