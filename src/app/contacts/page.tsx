import Form from "@/components/Form";
import React from "react";
import Map from "@/components/Map";
import { MdMarkEmailUnread } from "react-icons/md";
import RestaurantInfo from "@/components/Address";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Trattoria | contacts",
};

const Contacts = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex flex-col min-h-[calc(100vh-6rem)] h-full gap-2 lg:flex-row ">
          <RestaurantInfo />
          <Map />
        </div>
        <label
          htmlFor="my-drawer"
          className="btn drawer-button fixed bottom-4 right-4 bg-red-400 border-none rounded-full w-14 h-14 z-20 hover:bg-red-500 "
        >
          <MdMarkEmailUnread className="text-4xl text-white" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 max-w-[40rem] w-full h-[100vh] bg-white text-base-content">
          <Form />
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
