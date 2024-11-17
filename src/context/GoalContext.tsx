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
  timeframe: Timeframe.Daily,
  targetFrequency: 0,
  startDate: new Date(),
  endDate: new Date(),
  setGoalEntries: () => {},
  setUuid: () => {},
  setCategory: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setTimeframe: () => {},
  setTargetFrequency: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  createGoalEntry: () => {},
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
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Daily);
  const [targetFrequency, setTargetFrequency] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { user } = useContext(AuthContext);

  const createGoalEntry = async () => {
    const matchedGoalEntry = goalEntries.find((entry) => entry.uuid == uuid);

    const newGoalEntry = {
      id: '',
      uuid: uuidv4(),
      category,
      title,
      description,
      timeframe,
      targetFrequency,
      startDate,
      endDate,
    };

    const newGoalEntryDatabase = {
      id: '',
      uuid: newGoalEntry.uuid,
      // @ts-ignore 'user' is possibly 'null'!
      user: user.id,
      category,
      title,
      description,
      timeframe,
      targetFrequency,
      startDate,
      endDate,
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

  const resetGoalEntryFields = () => {
    setUuid('');
    setCategory(GoalCategory.Bewegen);
    setTitle('');
    setDescription('');
    setTimeframe(Timeframe.Daily);
    setTargetFrequency(0);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <GoalContext.Provider
      value={{
        goalEntries,
        uuid,
        category,
        title,
        description,
        timeframe,
        targetFrequency,
        startDate,
        endDate,
        setGoalEntries,
        setUuid,
        setCategory,
        setTitle,
        setDescription,
        setTimeframe,
        setTargetFrequency,
        setStartDate,
        setEndDate,
        createGoalEntry,
        resetGoalEntryFields,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
