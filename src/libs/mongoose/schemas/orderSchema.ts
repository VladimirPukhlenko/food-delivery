import { CartItemType } from "@/types/cart.interface";
import { timeStamp } from "console";
import { Schema, Types, model, models, Document, Model } from "mongoose";
import UserSchema, { UserModel } from "./UserSchema";
import { IUser } from "@/types/user.interface";

interface IOrder extends Document {
  email: string;
  price: number;
  status: string;
  products: CartItemType[];
}

interface OrderDocument extends IOrder, Document {}

interface OrderModel extends Model<OrderDocument> {}

const orderProductSchema = new Schema<CartItemType>({
  _id: String,
  title: String,
  img: String,
  price: Number,
  optionTitle: String,
  quantity: Number,
});

const orderSchema = new Schema<IOrder>(
  {
    email: String,
    price: Number,
    status: String,
    products: [orderProductSchema],
  },
  { timestamps: true }
);

const OrderModel =
  (models.orders as OrderModel) ||
  model<IOrder, OrderDocument>("orders", orderSchema);

export default OrderModel;
