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
  //endDate: new Date(),
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
  //setEndDate: () => {},
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
  //const [endDate, setEndDate] = useState<Date | null>(null);
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
      //endDate,
      // @TODO: Are these necessary on goal creation or only on update?
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
      //endDate,
      // @TODO: Are these necessary on goal creation or only on update?
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

    // Declare a variable to hold the updated entry
    let updatedEntry: IGoalEntry;

    // Update locally
    if (matchedGoalEntry) {
      // Get the index of the matching entry
      const index = goalEntries.indexOf(matchedGoalEntry);

      // Create the updated entry
      updatedEntry = { ...matchedGoalEntry };
      updatedEntry.completedTimeframe += 1;
      updatedEntry.completedPeriod +=1;

      if (updatedEntry.completedTimeframe >= updatedEntry.targetFrequency) {
        // Don't reset `completedTimeframe' if `updatedEntry.timeframe` equals `Timeframe.Daily`
        if (updatedEntry.timeframe !== Timeframe.Daily) {
          updatedEntry.completedTimeframe = 0;
        }
      }

      // Update the existing entry at the found index
      setGoalEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = updatedEntry;
        return updatedEntries;
      });

      // Update in database
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
          .update(matchedGoalEntryDatabase.id, {
            completedTimeframe: updatedEntry.completedTimeframe,
            completedPeriod: updatedEntry.completedPeriod,
          });
      } catch (error) {
        console.error('Error updating goal entry:', error);
      }
    } else {
      return;
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
    //setEndDate(null);
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
        //endDate,
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
        //setEndDate,
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
