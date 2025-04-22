import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from 'react';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

interface BonsaiContextType {
  points: number;
  unlockedItems: string[];
  setPoints: React.Dispatch<SetStateAction<number>>;
  setUnlockedItems: React.Dispatch<SetStateAction<string[]>>;
  unlockItem: (itemId: string, cost: number) => void;
  addPoints: (amount: number) => void;
  updateGamificationInDatabase: (
    newPoints: number,
    newUnlockedItems: string[]
  ) => Promise<void>;
}

const BonsaiContext = createContext<BonsaiContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(BonsaiContext);
  if (!context)
    throw new Error('useGamification must be used within a BonsaiProvider');
  return context;
};

export const BonsaiProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

  const [points, setPoints] = useState<number>(0);
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

  const updateGamificationInDatabase = async (
    newPoints: number,
    newUnlockedItems: string[]
  ) => {
    try {
      const newUnlockedItemsJSON = JSON.stringify(newUnlockedItems);

      const userRecord = await pb.collection('users').getOne(user?.id);

      await pb.collection('users').update(userRecord.id, {
        points: newPoints,
        unlockedItems: newUnlockedItemsJSON,
      });
    } catch (error) {
      console.error('Error updating gamification data:', error);
    }
  };

  return (
    <BonsaiContext.Provider
      value={{
        points,
        unlockedItems,
        setPoints,
        setUnlockedItems,
        unlockItem,
        addPoints,
        updateGamificationInDatabase,
      }}
    >
      {children}
    </BonsaiContext.Provider>
  );
};
