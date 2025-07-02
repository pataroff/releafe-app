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

  const createOrUpdateDiaryEntry = (): IDiaryEntry => {
    const formattedDate = getFormattedDate(date);
    const [year, month, day] = getFormattedDate(date).split('-').map(Number);
    const now = new Date();

    // month - 1 because JS Date months are 0-indexed
    const dateWithCurrentTime = new Date(
      year,
      month - 1,
      day,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === formattedDate
    );

    const uuid = matchedDiaryEntry?.uuid ?? uuidv4();

    const newDiaryEntry: IDiaryEntry = {
      uuid,
      date: dateWithCurrentTime, // Fresher date than the one when the diary creation process was started
      sliderValues,
      textValues,
    };

    const newDiaryEntryDatabase = {
      uuid,
      user: user?.id,
      date: dateWithCurrentTime,
      sliderValues: serializeRecord(sliderValues),
      textValues: serializeRecord(textValues),
    };

    if (matchedDiaryEntry) {
      const index = diaryEntries.indexOf(matchedDiaryEntry);
      setDiaryEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = newDiaryEntry;
        return updatedEntries;
      });

      // Async DB update
      updateDiaryEntryInDatabase(uuid, newDiaryEntryDatabase);
    } else {
      setDiaryEntries((prev) => [...prev, newDiaryEntry]);

      // Async DB create
      createDiaryEntryInDatabase(newDiaryEntryDatabase);
    }

    return newDiaryEntry;
  };

  const updateDiaryEntryInDatabase = async (uuid: string, entry: any) => {
    try {
      const matched = await pb
        .collection('diary_entries')
        .getFirstListItem(`uuid="${uuid}"`);
      await pb.collection('diary_entries').update(matched.id, entry);
    } catch (error) {
      console.error('Failed to update diary entry in DB:', error);
    }
  };

  const createDiaryEntryInDatabase = async (entry: any) => {
    try {
      await pb.collection('diary_entries').create(entry);
    } catch (error) {
      console.error('Failed to create diary entry in DB:', error);
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
