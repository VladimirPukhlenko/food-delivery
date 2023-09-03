import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import { BsTelephoneFill } from "react-icons/bs";
import UserLinks from "./UserLinks";
import { links } from "@/assets/links";

const Navbar = async () => {
  return (
    <div className="flex justify-between items-center border-b-2 border-orange-500 h-12 uppercase px-4 text-orange-500 md:px-8 xl:px-30">
      <div className="hidden md:flex gap-3 flex-1 font-medium h-full items-center">
        {links.map((link) => {
          return (
            <Link
              key={link.id}
              className="hover:text-orange-700 transition-colors h-full flex items-center "
              href={link.href}
            >
              {link.text}
            </Link>
          );
        })}
      </div>
      <div className=" flex flex-1 justify-center text-xl text-center font-bold text-orange-500 tracking-widest">
        <Link href={"/"}>Trattoria</Link>
      </div>

      <div className="hidden md:flex gap-3 justify-end  flex-1 text-red-500 font-medium ">
        <div className="flex items-center gap-1 md:text-white md:absolute top-3 right-3 xl:static xl:text-red-500 ">
          <BsTelephoneFill className="text-xs" />
          123 456 789
        </div>
        <UserLinks />
        <Link
          href={"/cart"}
          className="hover:text-orange-700 transition-colors h-full flex items-center "
        >
          <CartIcon />
        </Link>
      </div>
      <div className="md:hidden ">
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
