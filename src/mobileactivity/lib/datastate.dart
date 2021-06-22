import 'package:mobileactivity/playstate.dart';

class DataState{
  List<PlayState>? states;
  Map<String, List<Tuple2<int, DateTime>>>? dataPoints;

  DataState(){
    this.states = new List.empty();
    this.dataPoints = new Map();

    //todo load from the local state file
    loadProcedure();

  }

  void plot(PlayState state){
    // find the states data that the user has sown
  }

  void listerner(){
    // lisens to the data providor and update data accordingly. Then saves the states at intervalls
    // or by undetermined logic as of right now
  }

  void loadProcedure(){
    // todo load from the local files
  }
 }

class Tuple2 <A, B>{
  final A fst;
  final B snd;
  Tuple2(A fst, B snd) : this.fst = fst, snd = snd;
}