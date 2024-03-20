import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState } from 'react';
import { IDiaryEntry, IDiaryContext } from '../types';

// Create context
export const DiaryContext = createContext<IDiaryContext>({
  diaryEntries: [],
  addSliderValue: () => {},
  addTextValue: () => {},
  createDiaryEntry: () => {},
});

// Provider component
export const DiaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);
  const [sliderValues, setSliderValues] = useState<Map<number, number>>(
    new Map()
  );
  const [textValues, setTextValues] = useState<Map<number, string>>(new Map());

  const addSliderValue = (questionIndex: number, value: number) => {
    setSliderValues((prev) => {
      const newSliderValues = new Map<number, number>(prev); // Copy previous map
      newSliderValues.set(questionIndex, value); // Update new map
      return newSliderValues; // Return updated map
    });
  };

  const addTextValue = (questionIndex: number, value: string) => {
    setTextValues((prev) => {
      const newTextValues = new Map<number, string>(prev); // Copy previous map
      newTextValues.set(questionIndex, value); // Update new map
      return newTextValues; // Return updated map
    });
  };

  const createDiaryEntry = () => {
    const newEntry = {
      id: uuidv4(),
      sliderValues: sliderValues,
      textValues: textValues,
    };
    setDiaryEntries((prev) => [...prev, newEntry]);
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
        addSliderValue,
        addTextValue,
        createDiaryEntry,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
