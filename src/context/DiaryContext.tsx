import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { IDiaryEntry, IDiaryContext } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

// Create context
export const DiaryContext = createContext<IDiaryContext>({
  diaryEntries: [],
  sliderValues: {},
  textValues: {},
  date: new Date(),
  hasData: false,
  setDiaryEntries: () => {},
  setTextValues: () => {},
  addTextValue: () => {},
  setDate: () => {},
  setHasData: () => {},
  addSliderValue: () => {},
  resetSliderValues: () => {},
  resetTextValues: () => {},
  createDiaryEntry: () => {},
  serializeRecord: (record: Record<number, number | string>) => {
    return JSON.stringify(record);
  },
  deserializeRecord: (data: {
    [key: string]: number | string;
  }): Record<number, number | string> => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [Number(key), value])
    );
  },
});

// Provider component
export const DiaryProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext);

  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);
  const [sliderValues, setSliderValues] = useState<Record<number, number>>({});
  const [textValues, setTextValues] = useState<Record<number, string>>({});
  const [date, setDate] = useState<Date>(new Date());
  const [hasData, setHasData] = useState(false); // Wizard of Oz Method

  const addSliderValue = (questionIndex: number, value: number) => {
    setSliderValues((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const addTextValue = (questionIndex: number, value: string) => {
    setTextValues((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const resetSliderValues = () => {
    setSliderValues({});
  };

  const resetTextValues = () => {
    setTextValues({});
  };

  const createDiaryEntry = async () => {
    // Check if there is a matching entry with this date
    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === getFormattedDate(date)
    );

    // Create a new diary entry
    const newDiaryEntry = {
      id: '',
      uuid: uuidv4(),
      date: date,
      sliderValues: sliderValues,
      textValues: textValues,
    };

    // Create a new diary entry for database
    const newDiaryEntryDatabase = {
      // NOTE: "id: the length must be exactly 15."
      id: '',
      uuid: newDiaryEntry.uuid,
      // @ts-ignore 'user' is possibly 'null'
      user: user?.id,
      date: newDiaryEntry.date,
      sliderValues: serializeRecord(newDiaryEntry.sliderValues),
      textValues: serializeRecord(newDiaryEntry.textValues),
    };

    if (matchedDiaryEntry) {
      // Get the index of the matching entry
      const index = diaryEntries.indexOf(matchedDiaryEntry);

      // Update the existing entry at the found index
      setDiaryEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = newDiaryEntry;
        return updatedEntries;
      });

      // Get the existing entry from the databasae
      const matchedDiaryEntryDatabase = await pb
        .collection('diary_entries')
        .getFirstListItem(`uuid="${matchedDiaryEntry.uuid}"`);

      // Update the existing entry in the database
      await pb
        .collection('diary_entries')
        .update(matchedDiaryEntryDatabase.id, newDiaryEntryDatabase);
    } else {
      // Add the new entry to the array
      setDiaryEntries((prev) => [...prev, newDiaryEntry]);
      // Add the new entry to the database
      await pb.collection('diary_entries').create(newDiaryEntryDatabase);
    }
  };

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const serializeRecord = (record: Record<number, number | string>) => {
    return JSON.stringify(record);
  };

  const deserializeRecord = (data: {
    [key: string]: number | string;
  }): Record<number, number | string> => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [Number(key), value])
    );
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
        sliderValues,
        textValues,
        hasData,
        date,
        setDiaryEntries,
        setTextValues,
        addTextValue,
        setHasData,
        setDate,
        addSliderValue,
        resetSliderValues,
        resetTextValues,
        createDiaryEntry,
        serializeRecord,
        deserializeRecord,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
