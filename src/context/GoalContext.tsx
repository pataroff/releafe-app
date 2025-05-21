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
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [completedTimeframe, setCompletedTimeframe] = useState<number>(0);
  const [completedPeriod, setCompletedPeriod] = useState<number>(0);

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
              lastCompletedAt,
              completedTimeframe,
              completedPeriod,
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
              lastCompletedAt,
              completedTimeframe,
              completedPeriod,
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

  const createGoalEntry = async () => {
    const matchedGoalEntry = goalEntries.find((entry) => entry.uuid == uuid);

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
      lastCompletedAt,
      completedTimeframe,
      completedPeriod,
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
      lastCompletedAt,
      completedTimeframe,
      completedPeriod,
    };

    if (matchedGoalEntry) {
      // Get the index of the matching entry
      const index = goalEntries.indexOf(matchedGoalEntry);

      // Update the existing entry at the found index
      setGoalEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = newGoalEntry;
        return updatedEntries;
      });

      try {
        // Get the existing entry from the database
        const matchedGoalEntryDatabase = await pb
          .collection('goal_entries')
          .getFirstListItem(`uuid="${matchedGoalEntry.uuid}"`, {
            requestKey: null, // prevents auto-cancelling duplicate pending requests
          });

        // Update the existing entry in the database
        await pb
          .collection('goal_entries')
          .update(matchedGoalEntry.id, newGoalEntryDatabase);
      } catch (error) {
        console.error('Error updating goal entry:', error);
      }
    } else {
      setGoalEntries((prev) => [newGoalEntry, ...prev]);
      pb.collection('goal_entries').create(newGoalEntryDatabase);
    }
  };

  const updateGoalEntry = async (uuid: string) => {
    const matchedGoalEntry = goalEntries.find((entry) => entry.uuid === uuid);
    if (!matchedGoalEntry) return;

    const today = new Date();
    const todayUTC = today.toISOString().split('T')[0]; // e.g. "2025-05-21"

    const lastCompletedAtUTC = matchedGoalEntry.lastCompletedAt
      ? new Date(matchedGoalEntry.lastCompletedAt).toISOString().split('T')[0]
      : null;

    if (lastCompletedAtUTC === todayUTC) {
      return; // Already completed today
    }

    // @TODO This may be unnecessary!
    if (
      matchedGoalEntry.completedTimeframe >= matchedGoalEntry.targetFrequency
    ) {
      return; // Goal already fulfilled for this timeframe
    }

    // Update local entry
    const index = goalEntries.indexOf(matchedGoalEntry);

    const updatedEntry = {
      ...matchedGoalEntry,
      completedTimeframe: matchedGoalEntry.completedTimeframe + 1,
      completedPeriod: matchedGoalEntry.completedPeriod + 1,
      lastCompletedAt: today, // store current timestamp
    };

    setGoalEntries((prev) => {
      const updatedEntries = [...prev];
      updatedEntries[index] = updatedEntry;
      return updatedEntries;
    });

    // Update in database
    try {
      const matchedGoalEntryDatabase = await pb
        .collection('goal_entries')
        .getFirstListItem(`uuid="${matchedGoalEntry.uuid}"`, {
          requestKey: null,
        });

      await pb.collection('goal_entries').update(matchedGoalEntryDatabase.id, {
        completedTimeframe: updatedEntry.completedTimeframe,
        completedPeriod: updatedEntry.completedPeriod,
        lastCompletedAt: updatedEntry.lastCompletedAt,
      });
    } catch (error) {
      console.error('Error updating goal entry:', error);
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

  const refreshGoalTimeframes = async () => {
    const today = new Date();
    const todayUTC = today.toISOString().split('T')[0];

    for (const goal of goalEntries) {
      const endDateUTC = goal.endDate
        ? new Date(goal.endDate).toISOString().split('T')[0]
        : null;

      if (endDateUTC && endDateUTC < todayUTC) {
        const newStartDate = new Date();
        const newEndDate = new Date(newStartDate);

        switch (goal.timeframe) {
          case Timeframe.Daily:
            newEndDate.setUTCDate(newEndDate.getUTCDate() + 1);
            break;
          case Timeframe.Weekly:
            newEndDate.setUTCDate(newEndDate.getUTCDate() + 7);
            break;
          case Timeframe.Monthly:
            newEndDate.setUTCDate(newEndDate.getUTCDate() + 30);
            break;
          default:
            newEndDate.setUTCDate(newEndDate.getUTCDate() + 1);
        }

        const updatedGoal = {
          ...goal,
          completedTimeframe: 0,
          startDate: newStartDate,
          endDate: newEndDate,
        };

        // Update locally
        setGoalEntries((prev) => {
          const index = prev.findIndex((g) => g.uuid === goal.uuid);
          const copy = [...prev];
          copy[index] = updatedGoal;
          return copy;
        });

        // Update in PocketBase
        try {
          const matchedGoalEntryDatabase = await pb
            .collection('goal_entries')
            .getFirstListItem(`uuid="${goal.uuid}"`, { requestKey: null });

          await pb
            .collection('goal_entries')
            .update(matchedGoalEntryDatabase.id, {
              completedTimeframe: 0,
              startDate: newStartDate,
              endDate: newEndDate,
            });
        } catch (error) {
          console.error(`Error updating goal ${goal.uuid}:`, error);
        }
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
    setStartDate(null);
    setEndDate(null); // @TODO Is this necessary, cause it is not part from the UI?
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
        lastCompletedAt,
        completedTimeframe,
        completedPeriod,
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
        setLastCompletedAt,
        setCompletedTimeframe,
        setCompletedPeriod,
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
