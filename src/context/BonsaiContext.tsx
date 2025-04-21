import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BonsaiContextType {
  points: number;
  unlockedItems: string[];
  unlockItem: (itemId: string, cost: number) => void;
  addPoints: (amount: number) => void;
}

const BonsaiContext = createContext<BonsaiContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(BonsaiContext);
  if (!context)
    throw new Error('useGamification must be used within a BonsaiProvider');
  return context;
};

export const BonsaiProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState<number>(500);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  const unlockItem = (itemId: string, cost: number) => {
    if (points >= cost && !unlockedItems.includes(itemId)) {
      setPoints((prev) => prev - cost);
      setUnlockedItems((prev) => [...prev, itemId]);
    }
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  return (
    <BonsaiContext.Provider
      value={{ points, unlockedItems, unlockItem, addPoints }}
    >
      {children}
    </BonsaiContext.Provider>
  );
};
