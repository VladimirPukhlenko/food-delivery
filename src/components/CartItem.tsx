import React, { FC } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useCartStore } from "@/libs/zustance/store";
import Link from "next/link";
import { CartItemType } from "@/types/cart.interface";

const CartItem: FC<CartItemType> = (product) => {
  const { deleteFromCart } = useCartStore();
  return (
    <div className="py-2 text-base text-orange-500 h-1/3 mb-1 last:mb-0 flex items-center gap-14  lg:text-xl  ">
      <Link
        href={`/products/${product._id}`}
        className="relative w-[25%] h-full"
      >
        <Image
          src={product.img!}
          alt={product.title}
          fill
          objectFit="contain"
        />
      </Link>
      <div>
        <h1 className="uppercase font-bold">
          <Link href={`/products/${product._id}`}>{product.title}</Link>{" "}
          {product.quantity > 1 && (
            <span className="lowercase text-red-600 text-base">
              x{product.quantity}
            </span>
          )}
        </h1>
        <h3>{product.optionTitle} </h3>
      </div>
      <h1 className="font-bold">
        ${(product.price * product.quantity).toFixed(2)}
      </h1>
      <button
        className="cursor-pointer ml-auto"
        onClick={() => deleteFromCart(product)}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default CartItem;
