import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoalCategory, Timeframe, IGoalEntry, IGoalContext } from '../types';

import pb from '../lib/pocketbase';
import { useAuth } from './AuthContext';

// Create context
const GoalContext = createContext<IGoalContext | undefined>(undefined);

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) throw new Error('useGoal must be used within a GoalProvider');
  return context;
};

// Provider component
export const GoalProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [goalEntries, setGoalEntries] = useState<IGoalEntry[]>([]);
  const [uuid, setUuid] = useState<string>('');
  const [category, setCategory] = useState<GoalCategory>(GoalCategory.Bewegen);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sentence, setSentence] = useState<string>('');
  const [diarySentence, setDiarySentence] = useState<string>('');
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Daily);
  const [targetFrequency, setTargetFrequency] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [completedTimeframe, setCompletedTimeframe] = useState<number>(0);
  const [completedPeriod, setCompletedPeriod] = useState<number>(0);
  const [createdDate, setCreatedDate] = useState<Date | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchGoalEntries = async () => {
      if (user) {
        try {
          const res = await pb.collection('goal_entries').getList(1, 50, {
            filter: `user.id='${user.id}'`,
            sort: '-created',
            expand: 'user',
          });

          const formatted: IGoalEntry[] = res.items.map((item) => {
            const {
              id,
              uuid,
              category,
              title,
              description,
              sentence,
              diarySentence,
              timeframe,
              targetFrequency,
              startDate,
              endDate,
              completedDates,
              completedTimeframe,
              completedPeriod,
              createdDate,
            } = item;
            return {
              id,
              uuid,
              category,
              title,
              description,
              sentence,
              diarySentence,
              timeframe,
              targetFrequency,
              startDate,
              endDate,
              completedDates,
              completedTimeframe,
              completedPeriod,
              createdDate,
            };
          });

          setGoalEntries(formatted);
        } catch (error) {
          console.error('Error fetching goal entries:', error);
        }
      }
    };

    fetchGoalEntries();
  }, [user]);

  const createGoalEntry = () => {
    const newGoalEntry = {
      id: '',
      uuid: uuidv4(),
      category,
      title,
      description,
      diarySentence,
      sentence,
      timeframe,
      targetFrequency,
      startDate,
      endDate,
      completedDates,
      completedTimeframe,
      completedPeriod,
      createdDate,
    };

    const newGoalEntryDatabase = {
      id: '',
      uuid: newGoalEntry.uuid,
      // @ts-ignore 'user' is possibly 'null'!
      user: user.id,
      category,
      title,
      description,
      sentence,
      diarySentence,
      timeframe,
      targetFrequency,
      startDate,
      endDate,
      completedDates,
      completedTimeframe,
      completedPeriod,
      createdDate,
    };

    setGoalEntries((prev) => [newGoalEntry, ...prev]);
    createGoalEntryInDatabase(newGoalEntryDatabase);

    return newGoalEntry;
  };

  const createGoalEntryInDatabase = async (entry: any) => {
    try {
      await pb.collection('goal_entries').create(entry);
    } catch (error) {
      console.error('Failed to create goal entry in DB:', error);
    }
  };

  const updateGoalEntry = (uuid: string, forDate: Date = new Date()) => {
    const matchedGoalEntry = goalEntries.find((entry) => entry.uuid === uuid);

    if (!matchedGoalEntry) return;

    // Normalize all dates to YYYY-MM-DD for safe comparison
    const forDateString = forDate.toISOString().split('T')[0];
    const startDateString = new Date(matchedGoalEntry.startDate!)
      .toISOString()
      .split('T')[0];
    const endDateString = new Date(matchedGoalEntry.endDate!)
      .toISOString()
      .split('T')[0];
    const createdDateString = new Date(matchedGoalEntry.createdDate!)
      .toISOString()
      .split('T')[0];

    const completedDates = matchedGoalEntry.completedDates || [];

    if (completedDates.includes(forDateString)) {
      return; // Already marked as complete for this date
    }

    const shouldCountTowardsTimeframe =
      forDateString >= startDateString && forDateString <= endDateString;

    const shouldCountTowardsPeriod = forDateString >= createdDateString;

    const updatedCompletedDates = [forDateString, ...completedDates];

    const updatedEntry = {
      ...matchedGoalEntry,
      completedDates: updatedCompletedDates,
      completedTimeframe:
        matchedGoalEntry.completedTimeframe +
        (shouldCountTowardsTimeframe ? 1 : 0),
      completedPeriod:
        matchedGoalEntry.completedPeriod + (shouldCountTowardsPeriod ? 1 : 0),
    };

    // Update local state
    const index = goalEntries.indexOf(matchedGoalEntry);
    setGoalEntries((prev) => {
      const updatedEntries = [...prev];
      updatedEntries[index] = updatedEntry;
      return updatedEntries;
    });

    // Update PocketBase
    updateGoalEntryInDatabase(matchedGoalEntry, updatedEntry);

    return updatedEntry;
  };

  const updateGoalEntryInDatabase = async (
    matchedGoalEntry: IGoalEntry,
    updatedGoalEntry: IGoalEntry
  ) => {
    try {
      const matchedGoalEntryDatabase = await pb
        .collection('goal_entries')
        .getFirstListItem(`uuid="${matchedGoalEntry.uuid}"`, {
          requestKey: null,
        });

      await pb.collection('goal_entries').update(matchedGoalEntryDatabase.id, {
        completedDates: updatedGoalEntry.completedDates,
        completedTimeframe: updatedGoalEntry.completedTimeframe,
        completedPeriod: updatedGoalEntry.completedPeriod,
      });
    } catch (error) {
      console.error('Failed to update goal entry in DB:', error);
      // Optional: store to retry later or notify user
    }
  };

  const deleteGoalEntry = async (uuid: string) => {
    setGoalEntries((prev) => prev.filter((entry) => entry.uuid != uuid));

    try {
      // Get the corresponding entry from the database
      const matchedGoalEntryDatabase = await pb
        .collection('goal_entries')
        .getFirstListItem(`uuid="${uuid}"`);

      // Delete the existing entry from the database
      await pb.collection('goal_entries').delete(matchedGoalEntryDatabase.id);
    } catch (error) {
      console.error('Error deleting goal entry:', error);
    }
  };

  const refreshGoalTimeframes = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const staleGoals: IGoalEntry[] = [];

    for (const goal of goalEntries) {
      if (!goal.endDate) continue;

      const endDate = new Date(goal.endDate);
      endDate.setUTCHours(0, 0, 0, 0);

      if (endDate <= today) {
        let newStartDate = new Date(endDate);
        let newEndDate = new Date(newStartDate);

        const incrementDays =
          goal.timeframe === Timeframe.Weekly
            ? 7
            : goal.timeframe === Timeframe.Monthly
            ? 30
            : 1;

        while (newEndDate <= today) {
          newStartDate = new Date(newEndDate);
          newEndDate = new Date(newEndDate);
          newEndDate.setUTCDate(newEndDate.getUTCDate() + incrementDays);
        }

        const updatedGoal = {
          ...goal,
          completedTimeframe: 0,
          startDate: newStartDate,
          endDate: newEndDate,
        };

        // Update local state
        setGoalEntries((prev) => {
          const index = prev.findIndex((g) => g.uuid === goal.uuid);
          if (index === -1) return prev;
          const copy = [...prev];
          copy[index] = updatedGoal;
          return copy;
        });

        staleGoals.push(updatedGoal);
      }
    }

    if (staleGoals.length > 0) {
      refreshGoalTimeframesInDatabase(staleGoals); // don't await
    }
  };

  const refreshGoalTimeframesInDatabase = async (goals: IGoalEntry[]) => {
    for (const goal of goals) {
      try {
        const matchedGoalEntryDatabase = await pb
          .collection('goal_entries')
          .getFirstListItem(`uuid="${goal.uuid}"`, { requestKey: null });

        await pb
          .collection('goal_entries')
          .update(matchedGoalEntryDatabase.id, {
            completedTimeframe: 0,
            startDate: goal.startDate,
            endDate: goal.endDate,
          });
      } catch (error) {
        console.error(`Error syncing goal ${goal.uuid}:`, error);
      }
    }
  };

  const resetGoalEntryFields = () => {
    setUuid('');
    setCategory(GoalCategory.Bewegen);
    setTitle('');
    setDescription('');
    setSentence('');
    setDiarySentence('');
    setTimeframe(Timeframe.Daily);
    setTargetFrequency(1);
    // @TODO Are the resets below necessary?
    setStartDate(null);
    setEndDate(null);
    setCreatedDate(null);
  };

  return (
    <GoalContext.Provider
      value={{
        goalEntries,
        uuid,
        category,
        title,
        description,
        sentence,
        diarySentence,
        timeframe,
        targetFrequency,
        startDate,
        endDate,
        completedDates,
        completedTimeframe,
        completedPeriod,
        createdDate,
        setGoalEntries,
        setUuid,
        setCategory,
        setTitle,
        setDescription,
        setSentence,
        setDiarySentence,
        setTimeframe,
        setTargetFrequency,
        setStartDate,
        setEndDate,
        setCompletedDates,
        setCompletedTimeframe,
        setCompletedPeriod,
        setCreatedDate,
        createGoalEntry,
        updateGoalEntry,
        deleteGoalEntry,
        refreshGoalTimeframes,
        resetGoalEntryFields,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
