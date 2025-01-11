"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

interface CarouselProps {
  // Optional: callback so each slide trigger something 
  
  onSlideChange?: (newIndex: number) => void;
}

export default function Carousel({ onSlideChange }: CarouselProps) {
  const slides: Slide[] = [
    { src: "/photos/Dish1.png", alt: "Dish 1" },
    { src: "/photos/Dish4.png", alt: "Dish 2" },
    { src: "/photos/Dish3.png", alt: "Dish 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move to the next slide, or wrap back to 0
        const newIndex = prevIndex === slides.length - 1 ? 0 : prevIndex + 2;
        //  each slide change to trigger an order flow step, call the callback
        if (onSlideChange) {
          onSlideChange(newIndex);
        }
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [slides.length, onSlideChange]);

  return (
    <div className="relative w-[300px] h-[200px] overflow-hidden mx-auto">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 300px) 100vw, 300px" 
          />
        </div>
      ))}
    </div>
  );
}
