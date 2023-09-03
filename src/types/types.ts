export interface IMenuItem {
  _id: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  color: string;
}
export interface OrderItem {
  _id: string;
  title: string;
  status: string;
  price: number;
  products: CartItemType[];
  createdAt: Date;
  __v: number;
}

export interface CartItemType {
  _id: string;
  title: string;
  img: string;
  price: number;
  optionTitle: "Small" | "Medium" | "Large";
  quantity: number;
}
export type TCart = {
  products: CartItemType[];
  totalPrice: () => number;
  cartQuantity: () => number;
};

export type Product = {
  _id: string;
  title: string;
  desc: string;
  isFeatures?: boolean;
  img: string;
  price: number;
  options: {
    _id: string;
    title: "Small" | "Medium" | "Large";
    additionalPrice: number;
  }[];
  category: string;
};

export interface IOrder {
  email: string;
  price: number;
  status: string;
  products: CartItemType[];
}
