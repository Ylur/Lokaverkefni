// pages/carousel-page.tsx

import React from 'react';
import CarouselComponent from '../components/CarouselComponent';
import TopMenu from '../components/TopMenu';

const CarouselPage: React.FC = () => {
  const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
  ];

  return (
    <div>
      <TopMenu />
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">Welcome to Our Restaurant</h1>
      </header>
      <CarouselComponent images={images} />
    </div>
  );
};

export default CarouselPage;
