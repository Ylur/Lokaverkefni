'use client';

import React, { ReactNode } from 'react';
import { OrderProvider } from './contexts/OrderContext'; // Correct import

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <OrderProvider>
      {children}
    </OrderProvider>
  );
};

export default Providers;
