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

  const unlockItem = async (itemId: string, price: number) => {
    if (points < price || unlockedItems.includes(itemId)) {
      return;
    }

    const previousPoints = points;
    const previousUnlockedItems = [...unlockedItems];

    const updatedPoints = previousPoints - price;
    const updatedUnlockedItems = [...previousUnlockedItems, itemId];

    // Optimistically update local state
    setPoints(updatedPoints);
    setUnlockedItems(updatedUnlockedItems);

    try {
      await updateUnlockedItemsInDatabase(updatedPoints, updatedUnlockedItems);
    } catch (error) {
      console.error('Error unlocking item:', error);

      // Rollback local state
      setPoints(previousPoints);
      setUnlockedItems(previousUnlockedItems);

      // @TODO Optionally: show error to user that the action has failed!
    }
  };

  const addPoints = async (amount: number) => {
    const previousPoints = points;
    const updatedPoints = previousPoints + amount;

    setPoints(updatedPoints);

    try {
      await updatePointsInDatabase(updatedPoints);
    } catch (error) {
      console.error('Error updating points:', error);
      // Rollback if database update fails for some reason
      setPoints(previousPoints);
      // @TODO Optionally: show error to user that the action has failed!
    }
  };

  const updatePointsInDatabase = async (newPoints: number) => {
    const userRecord = await pb.collection('users').getOne(user?.id, {
      requestKey: null, // prevents auto-cancelling duplicate pending requests
    });

    await pb.collection('users').update(userRecord.id, {
      points: newPoints,
    });
  };

  const updateUnlockedItemsInDatabase = async (
    newPoints: number,
    newUnlockedItems: string[]
  ) => {
    const newUnlockedItemsJSON = JSON.stringify(newUnlockedItems);
    const userRecord = await pb.collection('users').getOne(user?.id);

    await pb.collection('users').update(userRecord.id, {
      points: newPoints,
      unlockedItems: newUnlockedItemsJSON,
    });
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
        updateTreeStateInDatabase,
      }}
    >
      {children}
    </BonsaiContext.Provider>
  );
};
