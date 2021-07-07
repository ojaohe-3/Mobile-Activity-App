import { Document, Schema, model, Model } from "mongoose";
import { GeoCoordinates, GeoCoordinatesBound } from "./geoCoordinates.model";

interface ISessionDocument extends Document {
  exists(): any;
  orgId: string;
  name: string;
  start: GeoCoordinates;
  end: GeoCoordinates;
  path: Array<GeoCoordinates>;
  bounds: GeoCoordinatesBound;
  current: GeoCoordinates;
  totalSteps: number;
  distance: string;
}

const sessionScheme = new Schema({
  orgId: { type: Schema.Types.ObjectId, require: true },
  name: { type: Schema.Types.String, require: true },
  start: { type: Object, require: true },
  end: { type: Object, require: true },
  path: { type: Schema.Types.Array, require: true },
  bounds: { type: Object, require: true },
  current: { type: Object, require: true },
  totalSteps: { type: Schema.Types.Number, require: true },
  distance: { type: Schema.Types.String, require: true },
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
  return await this.model("Session").find({ id: this.id }, (err) => {
    if (err) throw new Error(err.message);
  });
});

export interface SessionModel extends Model<ISessionDocument> {
  query(query: Object): any;
}
export { ISessionDocument as ISessionDocument, sessionScheme };
export default model<ISessionDocument>("Session", sessionScheme) as SessionModel;

