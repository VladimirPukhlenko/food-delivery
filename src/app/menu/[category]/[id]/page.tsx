import Price from "@/components/Price";
import Image from "next/image";
import React from "react";
import DeleteProductBtn from "@/components/DeleteProductBtn";
import { mongooseConnect } from "@/libs/mongoose/mongooseConnect";
import ProductDB from "@/libs/mongoose/productSchema";
import { Product } from "@/types/types";
import { getSingleProduct } from "@/requests/products";

// Из-за того, что в момент построения приложения сервер API не запущен, возможности использовать написанное на localhost API для generateStaticParams нет.
// Поэтому, если необходимо использовать generateStaticParams, придется обращаться к базе данных напрямую.
// Немного больше информации об этом можно найти здесь: https://stackoverflow.com/questions/61452675/econnrefused-during-next-build-works-fine-with-next-dev
// Такой подход также реализован в /menu/category. В случае необходимости, всё это можно быстро заменить на SSR или ISR, так как API и запросы уже готовы.
//Так как в ближайшее время я не планирую расширять список товаров и категорий, я отдам предпочтение SSG в силу скорости и меньшей нагрузки на сервер.

export async function generateStaticParams() {
  await mongooseConnect();
  const products: Product[] = await ProductDB.find();

  return products.map((product) => ({
    category: product.category,
    id: product._id.toString(),
  }));
}

export async function generateMetadata({ params }: Props) {
  await mongooseConnect();
  const response = await ProductDB.findById(params.id);
  const singleProduct: Product = JSON.parse(JSON.stringify(response));

  return {
    title: singleProduct.title,
  };
}

type Props = {
  params: {
    category: string;
    id: string;
  };
};

async function SingleProduct({ params }: Props) {
  await mongooseConnect();
  const response = await ProductDB.findById(params.id);
  const singleProduct: Product = JSON.parse(JSON.stringify(response));

  // const singleProduct = await getSingleProduct(params.id); - SSR
  return (
    <div className="py-1 h-[calc(100vh-6rem)] flex items-center flex-col xl:flex-row relative">
      <div className="relative h-1/2 w-full xl:h-full xl:w-1/2">
        <Image
          src={singleProduct.img}
          className="drop-shadow-xl"
          fill
          alt={singleProduct.title}
          objectFit="contain"
        />
      </div>

      <div className="p-2 text-sm text-orange-500 sm:text-base md:text-xl flex flex-col justify-evenly h-1/2 xl:gap-4 xl:h-2/3 xl:w-1/2">
        <h1 className="uppercase text-2xl font-bold sm:text-3xl">
          {singleProduct.title}
        </h1>
        <p className="xl:text-2xl">{singleProduct.desc}</p>
        <Price product={singleProduct} />
        <DeleteProductBtn id={params.id} />
      </div>
    </div>
  );
}

export default SingleProduct;
