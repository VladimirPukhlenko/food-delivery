import Image from "next/image";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const CountDown = dynamic(() => import("./CoutnDown"), {
  ssr: false,
});

const Offer = () => {
  return (
    <div className="bg-[url('/offerBg.png')] object-contain h-screen flex flex-col md:flex-row md:justify-between md:bg-center md:h-[70vh]">
      <div className="flex flex-1 flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Delicious Burger & French Fry
        </h1>
        <p className="text-white xl:text-xl">
          Savor the deliciousness of burgers and golden French fries – an
          unforgettable culinary delight.
        </p>
        <CountDown />
        <button className="bg-orange-500 text-white uppercase font-semibold rounded-md py-3 px-6">
          <Link href={"/menu"}> Order Now</Link>
        </button>
      </div>
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="/offerProduct.png"
          alt="offerProduct"
          fill
          objectFit="contain"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Offer;
