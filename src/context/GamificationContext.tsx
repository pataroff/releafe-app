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

import {
  findAchievementById,
  evaluateAllAchievements,
} from '../utils/achievements';
import { AchievementModal } from '../components/AchievementModal';
import { SelectedAchievement } from '../types';

interface TreeState {
  selectedBranchIndex: number | null;
  selectedLeafIndex: number | null;
  selectedFlowerIndex: number | null;
}

interface GamificationContextType {
  points: number;
  appUsageDates: string[];
  unlockedItems: string[];
  unlockedAchievements: string[];
  treeState: TreeState;
  setPoints: React.Dispatch<SetStateAction<number>>;
  setAchievementQueue: React.Dispatch<SetStateAction<SelectedAchievement[]>>;
  setAppUsageDates: React.Dispatch<SetStateAction<string[]>>;
  setUnlockedItems: React.Dispatch<SetStateAction<string[]>>;
  setUnlockedAchievemnts: React.Dispatch<SetStateAction<string[]>>;
  setTreeState: React.Dispatch<SetStateAction<TreeState>>;
  unlockItem: (itemId: string, cost: number) => void;
  unlockAchievement: (achievementId: string) => Promise<void>;
  addPoints: (amount: number) => void;
  updateTreeStateInDatabase: (
    selectedBranchIndex: number | null,
    selectedLeafIndex: number | null,
    selectedFlowerIndex: number | null
  ) => Promise<void>;
  updateUnlockedAchievementsInDatabase: (
    newUnlockedAchievements: string[]
  ) => Promise<void>;
  trackAppUsage: () => Promise<void>;
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

  const [isGamificationLoaded, setIsGamificaitonLoaded] =
    useState<boolean>(false);
  const [achievementModalVisible, setAchievementModalVisible] =
    useState<boolean>(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<SelectedAchievement | null>(null);
  const [achievementQueue, setAchievementQueue] = useState<
    SelectedAchievement[]
  >([]);

  const [points, setPoints] = useState<number>(0);
  const [appUsageDates, setAppUsageDates] = useState<string[]>([]);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [unlockedAchievements, setUnlockedAchievemnts] = useState<string[]>([]);
  const [treeState, setTreeState] = useState<TreeState>({
    selectedBranchIndex: null,
    selectedLeafIndex: null,
    selectedFlowerIndex: null,
  });

  useEffect(() => {
    const fetchGamification = async () => {
      if (!user) return;
      try {
        const userRecord = await pb.collection('users').getOne(user.id);
        const points = userRecord?.points ? userRecord.points : 0;
        const appUsageDates = userRecord?.appUsageDates
          ? userRecord.appUsageDates
          : [];
        const unlockedItems = userRecord?.unlockedItems
          ? userRecord.unlockedItems
          : [];
        const unlockedAchievements = userRecord?.unlockedAchievements
          ? userRecord.unlockedAchievements
          : [];
        const treeState = userRecord?.treeState
          ? userRecord.treeState
          : {
              selectedBranchIndex: null,
              selectedLeafIndex: null,
              selectedFlowerIndex: null,
            };

        setPoints(points);
        setAppUsageDates(appUsageDates);
        setUnlockedItems(unlockedItems);
        setUnlockedAchievemnts(unlockedAchievements);
        setTreeState(treeState);
      } catch (error) {
        console.error('Error fetching gamification data:', error);
      } finally {
        setIsGamificaitonLoaded(true);
      }
    };

    fetchGamification();
  }, [user]);

  useEffect(() => {
    const evaluateAppUsageAchievements = async () => {
      if (!isGamificationLoaded || !user) return;

      // Track usage first (updates appUsageDates state + PocketBase)
      await trackAppUsage();

      // Evaluate achievements
      await evaluateAllAchievements('onAppUsage', {
        appUsageDates,
        unlockedAchievements,
        unlockAchievement,
      });
    };

    evaluateAppUsageAchievements();
  }, [isGamificationLoaded]);

  useEffect(() => {
    if (!achievementModalVisible && achievementQueue.length > 0) {
      console.log('🎯 Achievement Queue Updated:', achievementQueue);
      const [next, ...rest] = achievementQueue;
      setSelectedAchievement(next);
      setAchievementModalVisible(true);
      setAchievementQueue(rest);
    }
  }, [achievementQueue, achievementModalVisible]);

  const trackAppUsage = async () => {
    const today = new Date().toISOString().split('T')[0];

    if (appUsageDates.includes(today)) return;

    const previousAppUsageDates = [...appUsageDates];
    const updatedDates = [today, ...appUsageDates];

    setAppUsageDates(updatedDates);

    try {
      await pb.collection('users').update(user?.id!, {
        appUsageDates: updatedDates,
      });
    } catch (error) {
      console.error('Failed to update appUsageDates:', error);
      setAppUsageDates(previousAppUsageDates);
    }
  };

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

      setPoints(previousPoints);
      setUnlockedItems(previousUnlockedItems);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    const previousUnlockedAchievements = [...unlockedAchievements];

    const updatedUnlockedAchievements = [
      achievementId,
      ...previousUnlockedAchievements,
    ];

    setUnlockedAchievemnts(updatedUnlockedAchievements);

    try {
      await updateUnlockedAchievementsInDatabase(updatedUnlockedAchievements);
      const achievement = findAchievementById(achievementId);
      if (achievement) {
        setAchievementQueue((prev) => [...prev, achievement]);
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);

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

  const updateUnlockedAchievementsInDatabase = async (
    newUnlockedAchievements: string[]
  ) => {
    const newUnlockedAchievementsJSON = JSON.stringify(newUnlockedAchievements);
    const userRecord = await pb
      .collection('users')
      .getOne(user?.id, { requestKey: null });

    await pb.collection('users').update(
      userRecord.id,
      {
        unlockedAchievements: newUnlockedAchievementsJSON,
      },
      { requestKey: null }
    );
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
        appUsageDates,
        unlockedItems,
        unlockedAchievements,
        treeState,
        setPoints,
        setAchievementQueue,
        setAppUsageDates,
        setUnlockedItems,
        setUnlockedAchievemnts,
        setTreeState,
        unlockItem,
        unlockAchievement,
        addPoints,
        updateTreeStateInDatabase,
        updateUnlockedAchievementsInDatabase,
        trackAppUsage,
      }}
    >
      {selectedAchievement && (
        <AchievementModal
          achievementModalVisible={achievementModalVisible}
          setAchievementModalVisible={setAchievementModalVisible}
          selectedAchievement={selectedAchievement}
          isAchievementUnlocked={true}
          mode='unlocked'
        />
      )}
      {children}
    </GamificationContext.Provider>
  );
};
