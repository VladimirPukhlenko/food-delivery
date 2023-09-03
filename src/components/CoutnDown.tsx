"use client";
import React, { useEffect, useState } from "react";

const CountDown = () => {
  let difference = +new Date("2023-10-25") - +new Date();
  const [delay, setDelay] = useState(difference);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div className="grid grid-flow-col text-yellow-400 gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": days } as React.CSSProperties}></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": hours } as React.CSSProperties}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": minutes } as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": seconds } as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountDown;
