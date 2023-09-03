import {
  Schema,
  model,
  models,
  Document,
  Model,
  SchemaTypes,
  Types,
} from "mongoose";

interface UserFields {
  email: string;
  name: string;
  picture: string;
  iat: number;
  exp: number;
  isAdmin?: boolean;
  orders: Types.ObjectId[];
}

interface UserDocument extends UserFields, Document {}

interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema<UserFields>({
  email: String,
  name: String,
  picture: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      ref: "orders",
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

const User: UserModel =
  (models.User as UserModel) ||
  model<UserDocument, UserModel>("User", UserSchema);

export default User;
