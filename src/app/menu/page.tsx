import { getAllCategories } from "@/requests/getCategories";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trattoria | menu",
};

const MenuPage = async () => {
  const menuItems = await getAllCategories();
  return (
    <div className="h-[calc(100vh-6rem)] justify-center p-4 flex  flex-col lg:flex-row lg:items-center">
      {menuItems &&
        menuItems.map((item) => {
          return (
            <Link
              key={item._id}
              href={`/menu/${item.slug}`}
              className={`bg-cover h-2/6 flex flex-col  p-4 ${`text-${item.color}`} justify-evenly md:gap-6 lg:h-1/2 lg:xl:h-2/3 lg:w-[30%]`}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <h1 className="uppercase font-bold text-2xl md:text-3xl lg:text-4xl">
                {item.title}
              </h1>
              <p className="hidden w-2/4 font-medium  lg:w-3/5 sm:block sm:text-sm md:text-base lg:hidden xl:block">
                {item.desc}
              </p>
            </Link>
          );
        })}
    </div>
  );
};

export default MenuPage;
