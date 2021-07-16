import { Document, Schema, model, Model } from "mongoose";
import { GeoCoordinates, GeoCoordinatesBound } from "../../models/geoCoordinates.model";

interface ISessionDocument extends Document {
  exist(): any;
  _id: string;
  orgId: string;
  name: string;
  start: GeoCoordinates;
  end: GeoCoordinates;
  path: Array<GeoCoordinates>;
  bounds: GeoCoordinatesBound;
  current: GeoCoordinates;
  totalSteps: number;
  distance: number;
}

const sessionScheme = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true},
  orgId: { type: Schema.Types.ObjectId, require: true },
  name: { type: Schema.Types.String, require: true },
  start: { type: Object, require: true },
  end: { type: Object, require: true },
  path: { type: Schema.Types.Array, require: true },
  bounds: { type: Object, require: true },
  current: { type: Object, require: true },
  totalSteps: { type: Schema.Types.Number, require: true },
  distance: { type: Schema.Types.Number, require: true },
});

sessionScheme.static("query", async function (query: Object) {
  return await this.find(query, (err) => {
    if (err) throw new Error(err.message);
  });
});

sessionScheme.static("getSessions", async function () {
  return await this.find({}, (err) => {
    if (err) throw new Error(err.message);
  });
});

sessionScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

sessionScheme.method("exist", async function () {
  return await this.model("session").find({ id: this.id }, (err) => {
    if (err) throw new Error(err.message);
  });
});

export interface SessionModel extends Model<ISessionDocument> {
  query(query: Object): any;
}
export { ISessionDocument as ISessionDocument, sessionScheme };
export default model<ISessionDocument>("session", sessionScheme) as SessionModel;

