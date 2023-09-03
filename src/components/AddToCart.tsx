"use client";

import { useCartStore } from "@/libs/zustance/store";
import { CartItemType, Product } from "@/types/types";
import React, { MouseEvent } from "react";
import toast from "react-hot-toast";

const AddToCart = ({ product }: { product: CartItemType }) => {
  const { addToCart } = useCartStore();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast(`${product.title} (${product.optionTitle.toLowerCase()}) added`, {
      icon: "✅",
    });
  };
  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 hover:transition-colors  text-white py-1 uppercase font-medium px-4 rounded-md"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
