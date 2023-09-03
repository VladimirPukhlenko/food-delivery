import { Model, Schema, Types, model, models } from "mongoose";

interface ICategory {
  title: string;
  desc: string;
  color: string;
  image: string;
  slug: string;
  createAT: Date;
  products: Types.ObjectId[];
}
interface CategoryDocument extends ICategory, Document {}

interface CategoryModel extends Model<CategoryDocument> {}

export const categorySchema: Schema = new Schema(
  {
    title: String,
    desc: String,
    color: String,
    image: String,
    slug: {
      type: String,
      unique: true,
    },
    products: [
      {
        ref: "Product",
        type: Schema.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const Category =
  (models.Category as CategoryModel) ||
  model<CategoryModel, CategoryDocument>("Category", categorySchema);
export default Category;
