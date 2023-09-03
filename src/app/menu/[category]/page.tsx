import { Product } from "@/types/types";
import MenuItem from "@/components/MenuItem";
import ProductDB from "@/libs/mongoose/productSchema";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import CategoryDB from "@/libs/mongoose/categorySchema";
import { IMenuItem } from "@/types/types";
import { getProducts } from "@/requests/products";

export async function generateMetadata({ params }: Props) {
  return {
    title: `Trattoria | ${params.category}`,
  };
}
export async function generateStaticParams() {
  await mongooseConnect();
  const categories: IMenuItem[] = await CategoryDB.find();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

type Props = {
  params: {
    category: string;
  };
};
async function Category({ params }: Props) {
  await mongooseConnect();
  const response = await ProductDB.find({
    category: params.category,
  });
  const products: Product[] = JSON.parse(JSON.stringify(response));

  // const products: Product[] = await getProducts(params.category); - SSR
  return (
    <div className="flex flex-col flex-wrap text-orange-500 sm:flex-row">
      {products &&
        products.map((product) => {
          return <MenuItem key={product._id} {...product} params={params} />;
        })}
    </div>
  );
}

export default Category;
