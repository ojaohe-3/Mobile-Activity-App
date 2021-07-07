


abstract class Observer{
  void update(dynamic args){

  }
}

class Subject{
  List<Observer>? observers;

  Subject(){
    observers = List.empty();
  }
  void add(Observer obs){
    observers!.add(obs);
  }

  void remove(Observer obs){
    observers!.remove(obs);
  }


}