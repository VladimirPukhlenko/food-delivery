import Image from "next/image";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SignInBtns } from "@/components/SignInBtns";

export const metadata: Metadata = {
  title: "Trattoria | login",
};
const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="h-[calc(100vh-6rem)] p-2 flex justify-center bg-slate-50 lg:items-center ld:p-0">
      <div className=" shadow-md h-full gap-4  rounded-b-lg overflow-hidden bg-white lg:flex  lg:w-[70%] lg:h-4/5 lg:rounded-r-lg lg:rounded-b-none">
        <div className="relative h-[30%] lg:w-[40%] lg:h-full">
          <Image
            src="/loginBg.png"
            fill
            alt="loginBg"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="flex flex-col gap-6 justify-center h-[70%] text-bas items-start px-4 lg:h-full lg:w-[60%] l ">
          <h1 className="font-bold text-2xl lg:text-3xl">Welcome</h1>
          <p className="text-xl">
            Log into your account or create a new one using social buttons
          </p>
          <SignInBtns />
          <p className="text-base">
            Have a problem?{" "}
            <Link href="/" className="border-black border-b-[1px]">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
