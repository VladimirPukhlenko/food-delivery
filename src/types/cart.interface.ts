export interface CartItemType {
  _id: string;
  title: string;
  img: string;
  price: number;
  optionTitle: "Small" | "Medium" | "Large";
  quantity: number;
}

export interface TCart {
  products: CartItemType[];
  totalPrice: () => number;
  cartQuantity: () => number;
}
