"use client";

import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <div
      className="bg-cover bg-center h-96 flex items-center justify-center "
      style={{ backgroundImage: 'url("/photos/lb.png")' }}
    ></div>
  );
};

export default Hero;
