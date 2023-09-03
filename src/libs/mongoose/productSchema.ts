import { Schema, model, Document, Types, models, Model } from "mongoose";

interface Option {
  title: string;
  additionalPrice: number;
}

interface IProduct extends Document {
  title: string;
  desc: string;
  color: string;
  image: string;
  price: number;
  isFeatures: boolean;
  createAT: Date;
  options: Option[];
  category: string;
}

interface ProductDocument extends IProduct, Document {}

interface ProductModel extends Model<ProductDocument> {}

const productSchema = new Schema<IProduct>(
  {
    title: String,
    desc: String,
    color: String,
    image: String,
    price: Number,
    isFeatures: {
      type: Boolean,
      default: false,
    },
    options: [{ title: String, additionalPrice: Number }],
    category: String,
  },
  { timestamps: true }
);

const Product =
  (models.Product as ProductModel) ||
  model<IProduct, ProductModel>("Product", productSchema);

export default Product;
