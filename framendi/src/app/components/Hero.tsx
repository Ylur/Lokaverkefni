'use client'

import React, { FC } from 'react';

const Hero: FC = () => {
  return (
    <div
      className="bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: 'url("/Images/lb.png")' }} //TODO SETA MYND
    >
      <h1 className="text-4xl font-bold">
        Where LiL Food Meets LiL Company - Lil bits
      </h1>
    </div>
  );
};

export default Hero;
