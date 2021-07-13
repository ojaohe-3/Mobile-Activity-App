class Org {
  final String id;
  final String name;
  final List<String> members;

  Org({required this.id, required this.name, required this.members});

  factory Org.fromJson(Map<String, dynamic> json) => Org(
      id: json['_id'],
      name: json['name'],
      members: parseMembers(json['members']))
  ;
  Map<String, dynamic> toJson() =>
      {'_id': this.id, 'name': this.name, 'members': this.members};

}

List<String> parseMembers(List<dynamic> raw){
  return raw.map((e) => e.toString()).toList();
}