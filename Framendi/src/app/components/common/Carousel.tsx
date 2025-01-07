"use client";

import React from "react";
import Image from "next/image";

export default function Carousel() {
  // Very minimal "carousel" showing three static dish images
  const slides = [
    { src: "/photos/Dish1.png", alt: "Dish 1" },
    { src: "/photos/Dish4.png", alt: "Dish 2" },
    { src: "/photos/Dish3.png", alt: "Dish 3" },
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto">
      {slides.map((slide, idx) => (
        <Image
          key={idx}
          src={slide.src}
          alt={slide.alt}
          width={300}
          height={200}
          className="object-cover"
        />
      ))}
    </div>
  );
}
