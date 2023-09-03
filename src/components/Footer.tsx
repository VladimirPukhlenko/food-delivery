import Link from "next/link";
import React from "react";
import medias from "@/assets/socialMedias";

const Footer = () => {
  return (
    <div className="h-24 p-4 md:px-8 xl:px-30 text-orange-500  flex items-center justify-between">
      <div className=" hidden flex-1 text-3xl md:flex gap-2  items-start sm:gap-4">
        {medias.map((media) => (
          <Link
            href={media.href}
            key={media.id}
            className="text-orange-200 hover:text-orange-400 transition-colors duration-200"
            target="_blank"
          >
            {media.component}
          </Link>
        ))}
      </div>
      <Link
        href={"/"}
        className="font-bold text-xl text-start tracking-widest flex-1 uppercase md:text-center"
      >
        Trattoria
      </Link>
      <p className="flex-1 text-end font-medium text-red-500">
        © ALL RIGHTS RESERVED
      </p>
    </div>
  );
};

export default Footer;
