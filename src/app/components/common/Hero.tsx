"use client";

import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: 'url("/photos/lb.png")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-serif font-semibold">Our LiL Menu</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
