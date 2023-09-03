import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbClockHour9 } from "react-icons/tb";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";

const RestaurantInfo = () => {
  return (
    <div className=" p-4 flex gap-2 text-lg flex-col relative lg:w-2/3  lg:px-8  ">
      <h1 className="font-semibold text-center text-xl text-orange-500 ">
        TRATTORIA Sunshine City
      </h1>
      <hr className="my-2" />
      <div className="h-full  grid grid-cols-1  gap-4 items-center text-justify lg:grid-cols-2 lg:grid-row-2 lg:gap-8">
        <section>
          <b className="text-red-500 flex items-baseline gap-1">
            <FaMapMarkerAlt className="text-base" />
            Address:
          </b>
          <p className="indent-2">
            123 Italian Street, Sunshine City, Sunnyland
          </p>
          <b className="text-red-500 flex items-center gap-1  ">
            <TbClockHour9 />
            Opening Hours:
          </b>
          <p className="indent-2">Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p className="indent-2">Saturday-Sunday: 12:00 PM - 11:00 PM</p>
          <p className="indent-2">
            Join us at our cozy location for a delightful dining experience. Our
            diverse menu is sure to satisfy your cravings.
          </p>
        </section>

        <section>
          <b className="text-red-500 flex items-baseline gap-1">
            <BsChatSquareText className="text-sm" />
            Description:
          </b>
          <p className="indent-2">
            TRATTORIA in Sunshine City brings you the authentic flavors of Italy
            right to your doorstep. Nestled in the heart of Sunshine City, our
            culinary haven radiates the warmth of Italian culture.
          </p>
          <p className="indent-2">
            Our skilled chefs, driven by their passion for perfection,
            meticulously prepare each dish with love and unwavering attention to
            detail.
          </p>
        </section>
        <section>
          <b className="text-red-500 flex items-center">
            <MdOutlineDeliveryDining />
            Delivery:
          </b>
          <p className="indent-2">
            We take pride in offering fast and reliable delivery right to your
            doorstep within Sunshine City. Our special packaging ensures that
            the flavors and aromas are preserved during transit.
          </p>
          <p className="indent-2">
            We look forward to receiving your order and hope that TRATTORIA
            becomes your preferred choice in Sunshine City!
          </p>
        </section>

        <section>
          <b className="text-red-500 flex items-center">
            <AiOutlineStar />
            Reputation:
          </b>
          <p className="indent-2">
            At TRATTORIA, our name resonates with Italian culinary authenticity.
            Our dedication to crafting dishes that embody Italy&apos;s heart and
            soul has forged a sterling reputation.
          </p>
          <p className="indent-2">
            We&#39;re recognized for our commitment to using the finest
            ingredients, combined with the skill of our passionate chefs.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RestaurantInfo;
