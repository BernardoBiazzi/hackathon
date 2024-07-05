/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';

import merchants from '../mocks/merchants.json';

// Definindo o tipo para o contexto
interface MerchantContextType {
  merchants: typeof merchants;
  selectedMerchant: typeof merchants[0];
  handleSelectMerchant: (merchant: typeof merchants[0]) => void;
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: any }> = ({ children }) => {
  const [selectedMerchant, setMerchant] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMerchant = localStorage.getItem('selectedMerchant');
      return savedMerchant ? JSON.parse(savedMerchant) : merchants[0];
    } else {
      return merchants[0];
    }
  });

  const handleSelectMerchant = (merchant: typeof merchants[0]) => {
    setMerchant(merchant);
  };

  useEffect(() => {
    localStorage.setItem('selectedMerchant', JSON.stringify(selectedMerchant));
  }, [selectedMerchant]);

  return (
    <MerchantContext.Provider value={{ merchants, selectedMerchant, handleSelectMerchant }}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => {
  const context = useContext(MerchantContext);
  if (context === undefined) {
    throw new Error('useMerchant must be used within a MerchantProvider');
  }
  return context;
};
