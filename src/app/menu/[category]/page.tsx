import MenuItem from "@/components/MenuItem";
import { ProductType, getProducts } from "@/services/products";
import { IProduct } from "@/types/product.interface";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: Props) {
  return {
    title: `Trattoria | ${params.category}`,
  };
}

type Props = {
  params: {
    category: string;
  };
};
async function Category({ params }: Props) {
  const products = await getProducts(params.category as ProductType).catch(() =>
    redirect("/")
  );

  return (
    <div className="flex flex-col flex-wrap text-orange-500 sm:flex-row">
      {products &&
        products?.map((product) => {
          return <MenuItem key={product._id} {...product} params={params} />;
        })}
    </div>
  );
}

export default Category;
