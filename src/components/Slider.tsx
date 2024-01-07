"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import sliderData from "@/assets/sliderData";

const Slider = () => {
  const [currentSlice, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (sliderData[prev + 1] ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] lg:flex-row">
      <div className="h-1/2 px-3 flex items-center justify-center flex-col gap-8 text-orange-500 font-bold lg:h-full lg:w-[60%]">
        <h1 className="uppercase text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-l from-red-500 to-orange-500">
          {sliderData[currentSlice].title}
        </h1>
        <button className="uppercase bg-gradient-to-l from-red-500 to-orange-500  rounded-xl text-white text-center px-6 py-3 text-2xl md:text-3xl md:px-8 md:py-4 lg:text-4xl  lg:px-10 lg::py-5 ">
          <Link href={"/menu"}>Order now</Link>
        </button>
      </div>
      <div className="h-1/2 relative w-full lg:h-full lg:w-[40%]">
        <Image
          src={sliderData[currentSlice].image}
          fill={true}
          alt={sliderData[currentSlice].title}
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

export default Slider;
