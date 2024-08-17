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
  const [worryEntries, setWorryEntries] = useState<IWorryListItem[]>([
    // Mock data
    {
      id: uuidv4(),
      category: Category.Work,
      priority: Priority.Low,
      date: new Date(),
      title: 'Angst voor presentatie',
      description:
        "Ik moet volgende week een belangrijke presentatie geven op het werk voor een groot publiek, inclusief mijn manager en een aantal senior collega's. Dit is een cruciale presentatie omdat het over een nieuw project gaat waar ik de leiding over heb gehad.",
      reframed: true,
    },
    {
      id: uuidv4(),
      category: Category.Relationships,
      priority: Priority.High,
      date: new Date(),
      title: 'Ruzies met partner',
      description:
        'Mijn partner en ik hebben de laatste tijd vaak ruzie, en ik ben bang dat onze relatie op het punt staat te eindigen.',
      reframed: false,
    },
    {
      id: uuidv4(),
      category: Category.Health,
      priority: Priority.Medium,
      date: new Date(),
      title: 'Hoofdpijn',
      description:
        'Ik heb de laatste tijd veel hoofdpijn en maak me zorgen dat het iets ernstigs kan zin, zoals een hersentumor.',
      reframed: false,
    },
  ]);
  const [category, setCategory] = useState<Category>(Category.Work);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [reframed, setReframed] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const createWorryEntry = () => {
    const newWorryEntry = {
      id: uuidv4(),
      category,
      priority,
      date,
      title,
      description,
      reframed,
    };

    const newWorryEntryDatabase = {
      id: '',
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
