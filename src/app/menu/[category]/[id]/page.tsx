import Price from "@/components/Price";
import Image from "next/image";
import React from "react";
import { getSingleProduct } from "@/services/products";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: Props) {
  const product = await getSingleProduct(params.id).catch(() => redirect("/"));
  return {
    title: product.title,
  };
}

type Props = {
  params: {
    category: string;
    id: string;
  };
};

async function SingleProduct({ params }: Props) {
  const singleProduct = await getSingleProduct(params.id).catch(() =>
    redirect("/")
  );

  return (
    <div className="py-1 h-[calc(100vh-6rem)] flex items-center flex-col xl:flex-row relative">
      <div className="relative h-1/2 w-full xl:h-full xl:w-1/2">
        <Image
          src={singleProduct?.img}
          className="drop-shadow-xl"
          fill
          alt={singleProduct?.title}
          objectFit="contain"
        />
      </div>

      <div className="p-2 text-sm text-orange-500 sm:text-base md:text-xl flex flex-col justify-evenly h-1/2 xl:gap-4 xl:h-2/3 xl:w-1/2">
        <h1 className="uppercase text-2xl font-bold sm:text-3xl">
          {singleProduct?.title}
        </h1>
        <p className="xl:text-2xl">{singleProduct?.desc}</p>
        <Price product={singleProduct!} />
      </div>
    </div>
  );
}

export default SingleProduct;
