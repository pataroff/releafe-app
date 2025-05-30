import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from 'react';

import pb from '../lib/pocketbase';
import { useAuth } from './AuthContext';

interface TreeState {
  selectedBranchIndex: number | null;
  selectedLeafIndex: number | null;
  selectedFlowerIndex: number | null;
}

interface GamificationContextType {
  points: number;
  unlockedItems: string[];
  unlockedAchievements: string[];
  treeState: TreeState;
  setPoints: React.Dispatch<SetStateAction<number>>;
  setUnlockedItems: React.Dispatch<SetStateAction<string[]>>;
  setUnlockedAchievemnts: React.Dispatch<SetStateAction<string[]>>;
  setTreeState: React.Dispatch<SetStateAction<TreeState>>;
  unlockItem: (itemId: string, cost: number) => void;
  unlockAchievement: (achievementId: string) => void;
  addPoints: (amount: number) => void;
  updateTreeStateInDatabase: (
    selectedBranchIndex: number | null,
    selectedLeafIndex: number | null,
    selectedFlowerIndex: number | null
  ) => Promise<void>;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined
);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context)
    throw new Error(
      'useGamification must be used within a GamificationProvider'
    );
  return context;
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchGamification = async () => {
      if (!user) return;
      try {
        const userRecord = await pb.collection('users').getOne(user.id);
        const points = userRecord?.points ? userRecord.points : 0;
        const unlockedItems = userRecord?.unlockedItems
          ? userRecord.unlockedItems
          : [];
        const unlockedAchievements = userRecord?.unlockedAchievements
          ? userRecord.unlockedAchievements
          : [];
        const treeState = userRecord?.treeState
          ? userRecord?.treeState
          : {
              selectedBranchIndex: null,
              selectedLeafIndex: null,
              selectedFlowerIndex: null,
            };

        setPoints(points);
        setUnlockedItems(unlockedItems);
        setUnlockedAchievemnts(unlockedAchievements);
        setTreeState(treeState);
      } catch (error) {
        console.error('Error fetching gamification data:', error);
      }
    };

    fetchGamification();
  }, [user]);

  const [points, setPoints] = useState<number>(0);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [unlockedAchievements, setUnlockedAchievemnts] = useState<string[]>([]);
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

  const unlockAchievement = async (achievementId: string) => {
    const previousUnlockedAchievements = [...unlockedAchievements];

    const updatedUnlockedAchievements = [
      achievementId,
      ...previousUnlockedAchievements,
    ];

    try {
      await updateUnlockedAchievemntsInDatabase(updatedUnlockedAchievements);
    } catch (error) {
      console.error('Error unoocking achievement:', error);

      setUnlockedAchievemnts(previousUnlockedAchievements);
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

  const updateUnlockedAchievemntsInDatabase = async (
    newUnlockedAchievements: string[]
  ) => {
    const newUnlockedAchievementsJSON = JSON.stringify(newUnlockedAchievements);
    const userRecord = await pb.collection('users').getOne(user?.id);

    await pb.collection('user').update(userRecord.id, {
      unlockedAchievements: newUnlockedAchievementsJSON,
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
    <GamificationContext.Provider
      value={{
        points,
        unlockedItems,
        unlockedAchievements,
        treeState,
        setTreeState,
        setPoints,
        setUnlockedItems,
        setUnlockedAchievemnts,
        unlockItem,
        unlockAchievement,
        addPoints,
        updateTreeStateInDatabase,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
