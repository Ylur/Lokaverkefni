"use client";

import React, { FC } from "react";


const AboutPage: FC = () => {
  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
        <p className="text-lg text-accent text-center leading-relaxed">
          Welcome to <span className="font-bold">Lil bits.</span> <br />
          <br />
          <br />
          At <span className="font-bold">Lil bits</span>,<br />
          we believe that food is not just a necessity,
          <br />
          <br />
        </p>
        <p className="text-lg text-accent mt-4 text-center">
          Come join us at <span className="font-bold">Lil bits</span>, where
          good food meets great company!
        </p>
        <br />
        <br />
        <div
          className="relative bg-cover bg-center h-96"
          style={{ backgroundImage: 'url("/photos/lb.png")' }}
        >
          <div className="absolute inset-0 bg-primary"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="text-center text-white">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
