


abstract class Observer{
  void update(dynamic args){

  }
}

class Subject{
  List<Observer> observers = List.empty();

  void add(Observer obs){
    observers.add(obs);
  }

  void remove(Observer obs){
    observers.remove(obs);
  }

  void run(dynamic args){
    observers.forEach((observer) => observer.update(args));
  }

}