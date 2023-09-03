import React from "react";
import Image from "next/image";
const EmptyOrderList = () => {
  return (
    <div className="text-red-500 h-[calc(100vh-6rem)] flex justify-center items-center px-4 lg:px-0">
      <div className="w-full h-full justify-center items-center flex flex-col gap-2">
        <div className="relative h-1/3 w-2/3  lg:w-1/5 lg:h-2/5 flex items-center justify-center">
          <Image
            src={"/noOrders.png"}
            alt="empty cart image"
            fill
            objectFit="contain"
          ></Image>
        </div>
        <h1 className="text-xl flex flex-col items-center gap-2 md:text-2xl lg:text-2xl ">
          <b>No orders found.</b>{" "}
          <span className="text-base text-red-400 md:text-xl">
            It looks like you haven&apos;t made any orders yet.
          </span>
        </h1>
      </div>
    </div>
  );
};

export default EmptyOrderList;
