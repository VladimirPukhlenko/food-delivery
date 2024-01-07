"use client";
import React, { useEffect } from "react";

import { useCartStore } from "@/libs/zustance/store";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartIcon = () => {
  const { cartQuantity } = useCartStore();
  const quantity = cartQuantity() > 0 ? cartQuantity() : "";
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <div className="flex gap-1 items-center justify-center relative ">
      <AiOutlineShoppingCart />
      Cart
      {quantity && (
        <span className="flex items-center justify-center absolute top-[-8px] right-[-23px] border border-white rounded-full bg-red-500 text-white  w-5 h-5  text-xs">
          {quantity}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
