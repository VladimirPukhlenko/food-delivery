"use client";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "./UI/Loader";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLEMAPS_API_KEY!,
  });

  return (
    <div className=" min-h-[70vh] h-full p-4 flex flex-col gap-2 lg:w-1/3 relative lg:px-8">
      <h1 className="text-center text-xl text-red-500  font-semibold">
        We on the map
      </h1>
      <hr className="my-2" />
      {isLoaded ? (
        <GoogleMap
          zoom={15}
          center={{ lat: 50.451138, lng: 30.525568 }}
          mapContainerClassName={"w-full h-full rounded-md"}
        >
          <Marker position={{ lat: 50.451138, lng: 30.525568 }} />
        </GoogleMap>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Map;
