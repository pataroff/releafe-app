import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { GoalCategory, Timeframe, IGoalEntry, IGoalContext } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

// Create context
export const GoalContext = createContext<IGoalContext>({
  goalEntries: [],
  uuid: '',
  category: GoalCategory.Releafe,
  title: '',
  description: '',
  sentence: '',
  diarySentence: '',
  timeframe: Timeframe.Daily,
  targetFrequency: 0,
  startDate: new Date(),
  lastCompletedAt: null,
  completedTimeframe: 0,
  completedPeriod: 0,
  setGoalEntries: () => {},
  setUuid: () => {},
  setCategory: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setSentence: () => {},
  setDiarySentence: () => {},
  setTimeframe: () => {},
  setTargetFrequency: () => {},
  setStartDate: () => {},
  setLastCompletedAt: () => {},
  setCompletedTimeframe: () => {},
  setCompletedPeriod: () => {},
  createGoalEntry: () => {},
  updateGoalEntry: () => {},
  deleteGoalEntry: () => {},
  resetGoalEntryFields: () => {},
});

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
  const [lastCompletedAt, setLastCompletedAt] = useState<Date | null>(null);
  const [completedTimeframe, setCompletedTimeframe] = useState<number>(0);
  const [completedPeriod, setCompletedPeriod] = useState<number>(0);

  const { user } = useContext(AuthContext);

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
    const matchedGoalEntry = goalEntries.find((entry) => entry.uuid == uuid);
    if (!matchedGoalEntry) return;

    const now = new Date();
    const lastCompletedAt = matchedGoalEntry.lastCompletedAt
      ? new Date(matchedGoalEntry.lastCompletedAt)
      : null;

    const getNextResetDate = (base: Date, days: number) => {
      const resetDate = new Date(base);
      resetDate.setDate(resetDate.getDate() + days);
      resetDate.setUTCHours(0, 0, 0, 0);
      return resetDate;
    };

    let canComplete = false;

    switch (matchedGoalEntry.timeframe) {
      case Timeframe.Daily:
        if (!lastCompletedAt || now >= getNextResetDate(lastCompletedAt, 1)) {
          matchedGoalEntry.completedTimeframe = 0;
          canComplete = true;
        }
        break;

      case Timeframe.Weekly:
        if (!lastCompletedAt || now >= getNextResetDate(lastCompletedAt, 7)) {
          matchedGoalEntry.completedTimeframe = 0;
        }
        canComplete = true;
        break;

      case Timeframe.Monthly:
        if (!lastCompletedAt || now >= getNextResetDate(lastCompletedAt, 30)) {
          matchedGoalEntry.completedTimeframe = 0;
        }
        canComplete = true;
        break;
    }

    if (!canComplete) return;

    // Create the updated entry
    const index = goalEntries.indexOf(matchedGoalEntry);

    const updatedEntry = {
      ...matchedGoalEntry,
      completedTimeframe: matchedGoalEntry.completedTimeframe + 1,
      completedPeriod: matchedGoalEntry.completedPeriod + 1,
      lastCompletedAt: now,
    };

    // Local update
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
    setLastCompletedAt(null); // @TODO Is this necessary, cause it is not part from the UI?
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
        setLastCompletedAt,
        setCompletedTimeframe,
        setCompletedPeriod,
        createGoalEntry,
        updateGoalEntry,
        deleteGoalEntry,
        resetGoalEntryFields,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
