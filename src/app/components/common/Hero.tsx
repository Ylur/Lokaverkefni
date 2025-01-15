"use client";

import React, { FC } from "react";
import "../../blink.css"; // blinking dot with restaurant color

const Hero: FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: 'url("/photos/lb.png")' }}
    >
      <div className="border rounded-lg absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white">
          {/* 
            I replaced the letter 'i' in "LiL" with 
            L<span class="blink-i">i</span>L so we can control the dot
          */}
          <h1 className="text-5xl font-serif font-semibold">
            L <span className="blink-i">l</span> L'B I T S
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
