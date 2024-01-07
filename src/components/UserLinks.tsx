"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import LoadingDots from "./UI/LoadingDots";

const UserLinks = () => {
  const { data: user, status } = useSession();
  if (status === "loading") {
    return <LoadingDots />;
  }

  return (
    <>
      {!user ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <>
          <Link
            className="uppercase px-2 rounded-lg text-white flex justify-center items-center bg-red-500 hover:bg-red-600 transition-colors"
            href={"/orders"}
          >
            Orders
          </Link>
          <button
            onClick={() => signOut()}
            className="uppercase px-2 rounded-lg border border-red-500 justify-center items-center hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default UserLinks;
