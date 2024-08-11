import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { IDiaryEntry, IDiaryContext } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

// Create context
export const DiaryContext = createContext<IDiaryContext>({
  diaryEntries: [],
  sliderValues: new Map<number, number>(),
  sliderQuestionIndex: 0,
  progressValue: 0,
  hasData: false,
  date: new Date(),
  setDiaryEntries: () => {},
  setHasData: () => {},
  setDate: () => {},
  setProgressValue: () => {},
  setSliderQuestionIndex: () => {},
  addSliderValue: () => {},
  resetSliderValues: () => {},
  resetTextValues: () => {},
  addTextValue: () => {},
  createDiaryEntry: () => {},
  jsonToMap: (jsonStr: string) => new Map<number, number | string>(),
});

// Provider component
export const DiaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);
  const [sliderQuestionIndex, setSliderQuestionIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [sliderValues, setSliderValues] = useState<Map<number, number>>(
    new Map()
  );
  const [textValues, setTextValues] = useState<Map<number, string>>(new Map());
  const [hasData, setHasData] = useState(false); // Wizard of Oz Method
  const [date, setDate] = useState<Date>(new Date());

  const { user } = useContext(AuthContext);

  const addSliderValue = (questionIndex: number, value: number) => {
    setSliderValues((prev) => {
      const newSliderValues = new Map<number, number>(prev); // Copy previous map
      newSliderValues.set(questionIndex, value); // Update new map
      return newSliderValues; // Return updated map
    });
  };

  const resetSliderValues = () => {
    setSliderValues((prev) => {
      const newSliderValues = new Map<number, number>(); // Create a new empty map
      return newSliderValues; // Return the new empty map
    });
  };

  const addTextValue = (questionIndex: number, value: string) => {
    setTextValues((prev) => {
      const newTextValues = new Map<number, string>(prev); // Copy previous map
      newTextValues.set(questionIndex, value); // Update new map
      return newTextValues; // Return updated map
    });
  };

  const resetTextValues = () => {
    setTextValues((prev) => {
      const newSliderValues = new Map<number, string>(); // Create a new empty map
      return newSliderValues; // Return the new empty map
    });
  };

  const createDiaryEntry = () => {
    // Check if there is a matching entry with this date
    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === getFormattedDate(date)
    );

    // Create a new diary entry
    const newEntry = {
      // TODO: Locally, `id` is an empty string prior to fetching diary entries from the database!
      id: '',
      date: date,
      sliderValues: sliderValues,
      textValues: textValues,
    };

    // Create a new diary entry for database
    const newEntryDatabase = {
      // NOTE: "id: the length must be exactly 15."
      id: '',
      user: user.id,
      date: newEntry.date,
      sliderValues: mapToJson(newEntry.sliderValues),
      textValues: mapToJson(newEntry.textValues),
    };

    if (matchedDiaryEntry) {
      // Get the index of the matching entry
      const index = diaryEntries.indexOf(matchedDiaryEntry);

      // Update the existing entry at the found index
      setDiaryEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = newEntry;
        return updatedEntries;
      });
      // Update the existing entry in the database
      pb.collection('diary_entries').update(
        matchedDiaryEntry.id,
        newEntryDatabase
      );
    } else {
      // Add the new entry to the array
      setDiaryEntries((prev) => [...prev, newEntry]);
      // Add the new entry to the database
      pb.collection('diary_entries').create(newEntryDatabase);
    }
  };

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const mapToJson = (map) => {
    return JSON.stringify(Object.fromEntries(map));
  };

  const jsonToMap = (data: {
    [key: string]: number | string;
  }): Map<number, number | string> => {
    return new Map<number, number | string>(
      Object.entries(data).map(([key, value]) => [Number(key), value])
    );
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
        sliderValues,
        sliderQuestionIndex,
        progressValue,
        hasData,
        date,
        setDiaryEntries,
        setHasData,
        setDate,
        setProgressValue,
        setSliderQuestionIndex,
        addSliderValue,
        resetSliderValues,
        resetTextValues,
        addTextValue,
        createDiaryEntry,
        jsonToMap,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
