import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { Category, Priority, IWorryListItem, IWorryContext } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

// Create context
export const WorryContext = createContext<IWorryContext>({
  worryEntries: [],
  category: Category.Work,
  priority: Priority.None,
  date: new Date(),
  title: '',
  description: '',
  reframed: false,
  setWorryEntries: () => {},
  setCategory: () => {},
  setPriority: () => {},
  setDate: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setReframed: () => {},
  createWorryEntry: () => {},
  resetWorryEntryFields: () => {},
});

// Provider component
export const WorryProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [worryEntries, setWorryEntries] = useState<IWorryListItem[]>([]);
  const [category, setCategory] = useState<Category>(Category.Work);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [reframed, setReframed] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const createWorryEntry = () => {
    const newWorryEntry = {
      id: '',
      uuid: uuidv4(),
      category,
      priority,
      date,
      title,
      description,
      reframed,
    };

    const newWorryEntryDatabase = {
      id: '',
      uuid: newWorryEntry.uuid,
      // @ts-ignore 'user' is possibly 'null'!
      user: user.id,
      category,
      priority,
      date,
      title,
      description,
      reframed,
    };

    setWorryEntries((prev) => [...prev, newWorryEntry]);
    pb.collection('worry_entries').create(newWorryEntryDatabase);
  };

  const resetWorryEntryFields = () => {
    setCategory(Category.Work);
    setPriority(Priority.None);
    setTitle('');
    setDescription('');
  };

  return (
    <WorryContext.Provider
      value={{
        worryEntries,
        category,
        priority,
        date,
        title,
        description,
        reframed,
        setWorryEntries,
        setCategory,
        setPriority,
        setDate,
        setTitle,
        setDescription,
        setReframed,
        createWorryEntry,
        resetWorryEntryFields,
      }}
    >
      {children}
    </WorryContext.Provider>
  );
};
