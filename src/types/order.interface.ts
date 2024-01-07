import { CartItemType } from "./cart.interface";

export interface OrderItem {
  _id: string;
  title: string;
  status: string;
  price: number;
  products: CartItemType[];
  createdAt: Date;
  __v: number;
}

export interface IOrder {
  email: string;
  price: number;
  status: string;
  products: CartItemType[];
}
