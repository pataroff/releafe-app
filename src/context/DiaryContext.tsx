import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { IDiaryEntry, IDiaryContext } from '../types';
import {
  getFormattedDate,
  serializeRecord,
  deserializeRecord,
} from '../utils/diary';

import { useAuth } from './AuthContext';

import pb from '../lib/pocketbase';

// Create context
const DiaryContext = createContext<IDiaryContext | undefined>(undefined);

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) throw new Error('useDiary must be used within a DiaryProvider');
  return context;
};

// Provider component
export const DiaryProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        oneYearAgo.setHours(0, 0, 0, 0);

        try {
          const res = await pb.collection('diary_entries').getList(1, 365, {
            filter: `user.id='${
              user.id
            }' && date >='${oneYearAgo.toISOString()}'`,
            sort: 'date', // asc order. but used to be in desc order
            expand: 'user',
          });

          // @ts-expect-error
          const formatted: IDiaryEntry[] = res.items.map((item) => {
            const { id, uuid, date, sliderValues, textValues } = item;
            return {
              id,
              uuid,
              date: new Date(date),
              sliderValues: deserializeRecord(sliderValues),
              textValues: deserializeRecord(textValues),
            };
          });

          setDiaryEntries(formatted);
        } catch (error) {
          console.error('Error fetching diary entries:', error);
        }
      }
    };

    fetchDiaryEntries();
  }, [user]);

  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);
  const [sliderValues, setSliderValues] = useState<Record<number, number>>({});
  const [textValues, setTextValues] = useState<Record<number, string>>({});
  const [date, setDate] = useState<Date>(new Date());

  const addSliderValue = (questionIndex: number, value: number) => {
    const roundedValue = Number(value.toFixed(1));

    setSliderValues((prev) => ({
      ...prev,
      [questionIndex]: roundedValue,
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

  const createOrUpdateDiaryEntry = async () => {
    const formattedDate = getFormattedDate(date);

    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === formattedDate
    );

    const uuid = matchedDiaryEntry?.uuid ?? uuidv4();

    const newDiaryEntry = {
      id: '',
      uuid,
      date,
      sliderValues,
      textValues,
    };

    const newDiaryEntryDatabase = {
      id: '',
      uuid,
      user: user?.id,
      date,
      sliderValues: serializeRecord(sliderValues),
      textValues: serializeRecord(textValues),
    };

    if (matchedDiaryEntry) {
      setDiaryEntries((prev) =>
        prev.map((entry) => (entry.uuid === uuid ? newDiaryEntry : entry))
      );

      try {
        const matchedDiaryEntryDatabase = await pb
          .collection('diary_entries')
          .getFirstListItem(`uuid="${uuid}"`);

        await pb
          .collection('diary_entries')
          .update(matchedDiaryEntryDatabase.id, newDiaryEntryDatabase);
      } catch (error) {
        console.error('Failed to update diary entry in DB:', error);
      }
    } else {
      setDiaryEntries((prev) => [...prev, newDiaryEntry]);

      await pb.collection('diary_entries').create(newDiaryEntryDatabase);
    }
  };

  return (
    <DiaryContext.Provider
      value={{
        diaryEntries,
        sliderValues,
        textValues,
        date,
        setSliderValues,
        setDiaryEntries,
        setTextValues,
        addTextValue,
        setDate,
        addSliderValue,
        resetSliderValues,
        resetTextValues,
        createOrUpdateDiaryEntry,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
