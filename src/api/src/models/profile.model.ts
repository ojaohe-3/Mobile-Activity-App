import { Document, model, Model, Schema } from "mongoose";

interface IProfile extends Document {
  exists(): any;
  name: string;
  oid: string;
}

const profileScheme = new Schema({
  name: { type: Schema.Types.String, require: true },
  oid: { type: Schema.Types.ObjectId, require: true },
});

profileScheme.static("query", async function (query: Object) {
  return await this.find(query, (err) => {
    if (err) throw new Error(err.message);
  });
});

profileScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

profileScheme.method("exist", async function () {
  return await this.model("Profile").find({ id: this.id }, (err) => {
    if (err) throw new Error(err.message);
  });
});

export interface ProfileModel extends Model<IProfile> {
  query(query: Object): any;
}
export { IProfile, profileScheme };
export default model<IProfile>("Profile", profileScheme);
