import { Document, Schema, model, Model } from "mongoose";

interface IOrgDocument extends Document {
  exists(): any;
  name: string;
  members?: string[];
}

const orgScheme = new Schema({
  name: { type: Schema.Types.String, require: true },
  members: { type: Schema.Types.Array, require: false, default: [] },
});

orgScheme.static("query", async function (query: Object) {
  return await this.find(query, (err) => {
    if (err) throw new Error(err.message);
  });
});

orgScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

orgScheme.method("exist", async function () {
  return await this.model("Org").find({ id: this.id }, (err) => {
    if (err) throw new Error(err.message);
  });
});

export interface OrgModel extends Model<IOrgDocument> {
  query(query: Object): any;
}
export { IOrgDocument as IOrgDocument, orgScheme };
export default model<IOrgDocument>("Org", orgScheme) as OrgModel;
