export interface IProduct {
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
}
