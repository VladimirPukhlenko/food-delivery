import React from "react";
import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="text-red-500 h-[calc(100vh-6rem)] flex flex-col  justify-center items-center px-4 lg:px-0">
      <div className="w-full h-full justify-center items-center flex flex-col">
        <div className="relative h-1/3 w-2/3   lg:w-1/5 lg:h-2/5 flex items-center justify-center">
          <Image
            src={"/emptyCart.png"}
            alt="empty cart image"
            fill
            objectFit="contain"
          ></Image>
        </div>
        <h1 className="text-xl flex flex-col items-center gap-2 md:text-2xl lg:text-2xl ">
          <b>Your cart is currently empty.</b>{" "}
          <span className="text-base text-red-400 md:text-xl ">
            Please check the{" "}
            <Link href={"/menu"} className="underline ">
              menu categories
            </Link>{" "}
            for food options.
          </span>
        </h1>
      </div>
    </div>
  );
};

export default EmptyCart;
