import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState } from 'react';
import { IDiaryEntry, IDiaryContext } from '../types';

// Create context
export const DiaryContext = createContext<IDiaryContext>({
  diaryEntries: [],
  sliderQuestionIndex: 0,
  progressValue: 0,
  hasData: false,
  createdAt: new Date(),
  setHasData: () => {},
  setCreatedAt: () => {},
  setProgressValue: () => {},
  setSliderQuestionIndex: () => {},
  addSliderValue: () => {},
  resetSliderValues: () => {},
  resetTextValues: () => {},
  addTextValue: () => {},
  createDiaryEntry: () => {},
});

// Provider component
export const DiaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([
    // dummy diary entry position
    {
      id: uuidv4(),
      createdAt: new Date('2024-05-14T12:13:00'),
      sliderValues: new Map<number, number>([
        [0, 8],
        [1, 3],
        [2, 6],
        [3, 8],
        [4, 4],
        [5, 5],
      ]),
      textValues: new Map<number, string>([
        [0, 'A'],
        [1, 'B'],
        [2, 'C'],
        [3, 'D'],
        [4, 'E'],
        [5, 'F'],
      ]),
    },
  ]);
  const [sliderQuestionIndex, setSliderQuestionIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [sliderValues, setSliderValues] = useState<Map<number, number>>(
    new Map()
  );
  const [textValues, setTextValues] = useState<Map<number, string>>(new Map());
  const [hasData, setHasData] = useState(false); // Wizard of Oz Method
  const [createdAt, setCreatedAt] = useState<Date>(new Date());

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
    const newEntry = {
      id: uuidv4(),
      createdAt: createdAt,
      sliderValues: sliderValues,
      textValues: textValues,
    };
    setDiaryEntries((prev) => [...prev, newEntry]);
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
        sliderQuestionIndex,
        progressValue,
        hasData,
        createdAt,
        setHasData,
        setCreatedAt,
        setProgressValue,
        setSliderQuestionIndex,
        addSliderValue,
        resetSliderValues,
        resetTextValues,
        addTextValue,
        createDiaryEntry,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
