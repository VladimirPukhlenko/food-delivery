"use client";

import { useCartStore } from "@/libs/zustance/store";
import { Product } from "@/types/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Price = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const AddToCartHandle = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      img: product.img,
      price: product.price + product.options[selected].additionalPrice,
      quantity: quantity,
      optionTitle: product.options[selected].title || "",
    });
    setQuantity(1);
    toast(
      `${product.title} (${product.options[selected].title.toLowerCase()})${
        quantity > 1 ? `x${quantity}` : ""
      } added`,
      {
        icon: "✅",
      }
    );
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setTotal(
      quantity *
        (product.options
          ? product.price + product.options[selected].additionalPrice
          : product.price)
    );
  }, [quantity, selected, product.options, product.price]);

  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl">${total.toFixed(2)}</h1>
      <div className="flex justify-between sm:justify-start sm:gap-4 h-1/8">
        {product.options &&
          product.options.map((item, index) => {
            return (
              <button
                key={item._id}
                onClick={() => setSelected(index)}
                className={`${
                  selected == index ? "bg-orange-500 text-white" : ""
                } text-base border flex justify-center items-center border-orange-500 font-semibold  px-4 py-1  sm:px-8 sm:py-2 rounded-lg md:text-xl`}
              >
                {item.title}
              </button>
            );
          })}
      </div>

      <div className="flex justify-between h-1/6 xl:text-xl">
        <div className="px-4 w-3/4 flex justify-between items-center border border-orange-500">
          <span>Quantity</span>
          <div>
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>{" "}
            {quantity}{" "}
            <button
              onClick={() =>
                setQuantity((prev) => (prev < 9 ? prev + 1 : prev))
              }
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          className="w-1/4 text-white text-sm bg-gradient-to-l from-red-500  to-orange-500 font-semibold uppercase  filter hover:brightness-125 transition-all duration-300 md:text-xl"
          onClick={AddToCartHandle}
        >
          Add to cart
        </button>
      </div>
    </>
  );
};

export default Price;
