import { Product } from "@/types/types";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import AddToCart from "./AddToCart";
type Props = Product & {
  params: {
    category: string;
  };
};
const MenuItem: FC<Props> = ({ _id, title, img, price, params }) => {
  return (
    <Link
      href={`/menu/${params.category}/${_id}`}
      key={_id}
      className="border-r-2 group border-b-2 border-orange-500  p-4 flex flex-col odd:bg-red-50 h-[calc((100vh-6rem)/2)]  sm:w-1/2 lg:w-1/3 "
    >
      <div className="relative flex w-full h-[80%]">
        <Image src={img} fill alt={title} objectFit="contain" />
      </div>
      <div className="h-[20%] flex justify-between items-center text-xl font-bold">
        <div>{title}</div>
        <span className="hidden group-hover:block">
          <AddToCart
            product={{
              _id,
              title,
              img,
              price,
              optionTitle: "Small",
              quantity: 1,
            }}
          />
        </span>
        <div className=" blok group-hover:hidden">{price} $</div>
      </div>
    </Link>
  );
};

export default MenuItem;
