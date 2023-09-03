import React from "react";

const Loader = () => {
  return (
    <div className="h-full  flex justify-center items-center p-2 bg-white lg:items-center ld:p-0">
      <span className="loading loading-spinner loading-lg text-orange-500"></span>
    </div>
  );
};

export default Loader;
