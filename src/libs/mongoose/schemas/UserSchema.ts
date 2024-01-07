import { Schema, model, models, Document, Model } from "mongoose";

interface UserFields extends Document {
  email: string;
  name: string;
  picture: string;
  iat: number;
  exp: number;
  isAdmin?: boolean;
}

export interface UserDocument extends UserFields, Document {}

export interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema<UserFields>({
  email: String,
  name: String,
  picture: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User: UserModel =
  (models.User as UserModel) ||
  model<UserDocument, UserModel>("User", UserSchema);

export default User;
