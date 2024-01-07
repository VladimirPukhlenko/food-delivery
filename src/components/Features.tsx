import { getProducts } from "@/services/products";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { redirect } from "next/navigation";

const Features = async () => {
  const featuredProducts = await getProducts("features").catch(() =>
    redirect("/")
  );
  return (
    <div className="overflow-x-scroll text-amber-500">
      <div className="flex w-max h-max">
        {featuredProducts &&
          featuredProducts.map((product) => {
            return (
              <div
                key={product._id}
                className="w-screen h-[70vh] flex flex-col gap-2 px-8 py-4 md:w-[50vw] xl:w-[33vw] xl:h-[80vh] hover:bg-red-50 hover:text-red-500 transition-all duration-300"
              >
                {product.img && (
                  <Link
                    href={`/menu/${product.category}/${product._id}`}
                    className="relative flex-1 cursor-pointer"
                  >
                    <Image
                      src={product.img}
                      alt="image"
                      fill
                      objectFit="contain"
                    />
                  </Link>
                )}
                <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4 xl:gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl"
                  >
                    {product.title}
                  </Link>
                  <p className="text-justify ">{product.desc}</p>
                  <span className="text-xl font-bold">${product.price}</span>
                  <AddToCart
                    product={{
                      _id: product._id,
                      title: product.title,
                      img: product.img,
                      price: product.price,
                      optionTitle: "Small",
                      quantity: 1,
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Features;
