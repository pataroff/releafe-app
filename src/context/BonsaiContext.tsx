import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from 'react';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

interface TreeState {
  selectedBranchIndex: number | null;
  selectedLeafIndex: number | null;
  selectedFlowerIndex: number | null;
}

interface BonsaiContextType {
  points: number;
  unlockedItems: string[];
  treeState: TreeState;
  setPoints: React.Dispatch<SetStateAction<number>>;
  setUnlockedItems: React.Dispatch<SetStateAction<string[]>>;
  setTreeState: React.Dispatch<SetStateAction<TreeState>>;
  unlockItem: (itemId: string, cost: number) => void;
  addPoints: (amount: number) => void;
  updatePointsInDatabase: (newPoints: number) => Promise<void>;
  updateUnlockedItemsInDatabase: (
    newPoints: number,
    newUnlockedItems: string[]
  ) => Promise<void>;
  updateTreeStateInDatabase: (
    selectedBranchIndex: number | null,
    selectedLeafIndex: number | null,
    selectedFlowerIndex: number | null
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
  const [treeState, setTreeState] = useState<TreeState>({
    selectedBranchIndex: null,
    selectedLeafIndex: null,
    selectedFlowerIndex: null,
  });

  const unlockItem = (itemId: string, cost: number) => {
    if (points >= cost && !unlockedItems.includes(itemId)) {
      setPoints((prev) => prev - cost);
      setUnlockedItems((prev) => [...prev, itemId]);
    }
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => {
      const updatedPoints = prev + amount;
      updatePointsInDatabase(updatedPoints);
      return updatedPoints;
    });
  };

  const updatePointsInDatabase = async (newPoints: number) => {
    try {
      const userRecord = await pb.collection('users').getOne(user?.id);

      await pb.collection('users').update(userRecord.id, {
        points: newPoints,
      });
    } catch (error) {
      console.error('Error updating points data:', error);
    }
  };

  const updateUnlockedItemsInDatabase = async (
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
      console.error('Error updating unlocked items data:', error);
    }
  };

  const updateTreeStateInDatabase = async (
    selectedBranchIndex: number | null,
    selectedLeafIndex: number | null,
    selectedFlowerIndex: number | null
  ) => {
    try {
      const updatedTreeState = {
        selectedBranchIndex,
        selectedLeafIndex,
        selectedFlowerIndex,
      };

      const userRecord = await pb.collection('users').getOne(user?.id);

      await pb.collection('users').update(userRecord.id, {
        treeState: updatedTreeState,
      });
    } catch (error) {
      console.error('Error updating tree state data:', error);
    }
  };

  return (
    <BonsaiContext.Provider
      value={{
        points,
        unlockedItems,
        treeState,
        setTreeState,
        setPoints,
        setUnlockedItems,
        unlockItem,
        addPoints,
        updatePointsInDatabase,
        updateUnlockedItemsInDatabase,
        updateTreeStateInDatabase,
      }}
    >
      {children}
    </BonsaiContext.Provider>
  );
};
