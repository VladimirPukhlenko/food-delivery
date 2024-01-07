"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const SignInBtns = () => {
  return (
    <>
      <button
        className="flex items-center gap-2 border  border-gray-300 w-3/4 p-2 rounded-lg"
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
      >
        <Image src={"/google.png"} width={25} height={25} alt="google logo" />
        Sign in with Google
      </button>
      <button
        className="flex items-center gap-2 border  border-gray-300 w-3/4 p-2 rounded-lg"
        onClick={() =>
          signIn("facebook", { redirect: false, callbackUrl: "/" })
        }
      >
        <Image src={"/facebook.png"} width={25} height={25} alt="google logo" />
        Sign in with Facebook
      </button>
    </>
  );
};
