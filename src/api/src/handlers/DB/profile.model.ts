import mongoose, { Document, model, Model, Schema } from "mongoose";

interface IProfileDocument extends Document {
  exist(): any;
  _id: string;
  name: string;
  oid: string;
}

const profileScheme = new Schema({
  _id: {type: Schema.Types.ObjectId, require: true, unique: true},
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
  return await this.model("profile").find({ id: this.id }, (err) => {
    if (err) throw new Error(err.message);
  });
});

export interface ProfileModel extends Model<IProfileDocument> {
  query(query: Object): any;
}
export { IProfileDocument as IProfileDocument, profileScheme };
export default model<IProfileDocument>("profile", profileScheme) as ProfileModel;
