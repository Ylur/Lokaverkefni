"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

interface CarouselProps {
  onSlideChange?: (newIndex: number) => void;
}

export default function Carousel({ onSlideChange }: CarouselProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1) Fetch slides from the dish API on mount
  useEffect(() => {
    async function fetchSlides() {
      const fetched: Slide[] = [];

      // Fetch 3 random dishes for the carousel
      for (let i = 0; i < 3; i++) {
        try {
          const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const data = await res.json();
          if (data.meals && data.meals.length > 0) {
            fetched.push({
              src: data.meals[0].strMealThumb,
              alt: data.meals[0].strMeal,
            });
          }
        } catch (error) {
          console.error("Error fetching dish:", error);
        }
      }

      setSlides(fetched);
    }

    fetchSlides();
  }, []);

  // 2) Auto-advance the carousel every 3 seconds (once slides are loaded)
  useEffect(() => {
    if (slides.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % slides.length;
        if (onSlideChange) {
          onSlideChange(newIndex);
        }
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [slides, onSlideChange]);

  // 3) Determine which three slides to display based on currentIndex
  const indicesToShow =
    slides.length > 0
      ? [0, 1, 2].map((offset) => (currentIndex + offset) % slides.length)
      : [];

  return (
    <div className="w-full overflow-hidden flex justify-center items-center">
      <div
        className="
          flex
          w-full
          sm:w-[500px] md:w-[700px] lg:w-[900px]
          h-[150px] sm:h-[200px] lg:h-[300px]
          transition-all duration-500
          border
        "
      >
        {indicesToShow.length > 0 ? (
          indicesToShow.map((idx) => {
            const slide = slides[idx];
            return (
              <div
                key={idx}
                className="
                  relative flex-shrink-0
                  w-[100px] sm:w-[150px] md:w-[250px] lg:w-[300px]
                  h-[150px] sm:h-[200px] lg:h-[300px]
                  mx-auto
                  border
                "
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 300px) 100vw, 300px"
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
}
