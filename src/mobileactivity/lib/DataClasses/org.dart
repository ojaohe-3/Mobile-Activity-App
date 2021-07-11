class Org {
  final String id;
  final String name;
  final List<String> members;

  Org({required this.id, required this.name, required this.members});

  factory Org.fromJson(Map<String, dynamic> json) => Org(
      id: json['id'],
      name: json['name'],
      members: json['members'] as List<String>);
  List<String> parseMembers(List<dynamic> raw){
    return raw.map((e) => e.toString()).toList();
  }
  Map<String, dynamic> toJson() =>
      {'id': this.id, 'name': this.name, 'members': this.members};
}
