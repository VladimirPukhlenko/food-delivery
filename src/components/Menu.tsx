"use client";
import React, { useState } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { phoneLinks } from "@/assets/links";

const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { data } = useSession();

  return (
    <div>
      <span
        className="text-2xl text-red-500 "
        onClick={() => setMenuIsOpen((prev) => !prev)}
      >
        {menuIsOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </span>
      {menuIsOpen && (
        <div className="bg-gradient-to-l from-red-500 to-orange-500 text-center absolute  z-10 left-0 top-24 text-white flex flex-col items-center justify-center gap-6 w-full text-3xl p-2 h-[calc(100vh-6rem)]">
          {phoneLinks.map((link) => {
            return (
              <Link
                href={link.url}
                key={link.id}
                onClick={() => setMenuIsOpen((prev) => !prev)}
              >
                {link.title}
              </Link>
            );
          })}
          {!data?.user ? (
            <Link
              href={"/login"}
              onClick={() => setMenuIsOpen((prev) => !prev)}
            >
              Login
            </Link>
          ) : (
            <Link
              href={"/orders"}
              onClick={() => setMenuIsOpen((prev) => !prev)}
            >
              Orders
            </Link>
          )}
          <Link href={"/cart"} onClick={() => setMenuIsOpen((prev) => !prev)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
