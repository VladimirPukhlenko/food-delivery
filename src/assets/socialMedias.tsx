import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io";

const medias = [
  {
    id: 1,
    component: <FaFacebook />,
    href: "https://www.facebook.com/",
  },
  {
    id: 2,
    component: <SiInstagram />,
    href: "https://www.instagram.com/",
  },
  {
    id: 3,
    component: <IoLogoYoutube />,
    href: "https://www.youtube.com/",
  },
];
export default medias;
