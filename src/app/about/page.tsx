"use client";

import React, { FC } from "react";

const AboutPage: FC = () => {
  return (
    <>
      <div className="flex container mx-auto p-8">
        <div className="p-4">
          <h1 className="vertical-text text-8xl text-primary font-bold">
            A B O U T
          </h1>
        </div>

        <p className="flex-2 px-8 text-2xl text-primary text-center leading-relaxed">
          Welcome to <span className="font-bold">Lil bits.</span>
          <br />
          Where food isn't just served —it's celebrated. Each dish is a tribute
          to fresh ingredients, thoughtful preparation, and the joy of sharing a
          meal together. <br />
          <br />
        </p>
        <p className="text-2xl text-primary mt-4 text-center">
          Join us at <span className="font-bold">Lil bits</span> and discover
          how great flavors and an even better community can make every visit
          one to remember!
        </p>
        <br />
        <br />
      </div>
    </>
  );
};

export default AboutPage;
