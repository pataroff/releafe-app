import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { Category, Priority, IWorryListItem, IWorryContext } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

// Create context
export const WorryContext = createContext<IWorryContext>({
  worryEntries: [],
  uuid: '',
  category: Category.Work,
  priority: Priority.None,
  date: new Date(),
  title: '',
  description: '',
  reframed: false,
  setWorryEntries: () => {},
  setUuid: () => {},
  setCategory: () => {},
  setPriority: () => {},
  setDate: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setReframed: () => {},
  createWorryEntry: () => {},
  deleteWorryEntry: () => {},
  updateWorryEntryFields: () => {},
  resetWorryEntryFields: () => {},
});

// Provider component
export const WorryProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [worryEntries, setWorryEntries] = useState<IWorryListItem[]>([]);
  const [uuid, setUuid] = useState<string>('');
  const [category, setCategory] = useState<Category>(Category.Work);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [reframed, setReframed] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const createWorryEntry = async () => {
    const matchedWorryEntry = worryEntries.find((entry) => entry.uuid == uuid);

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

    if (matchedWorryEntry) {
      // Get the index of the matching entry
      const index = worryEntries.indexOf(matchedWorryEntry);

      // Update the existing entry at the found index
      setWorryEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = newWorryEntry;
        return updatedEntries;
      });

      try {
        // Get the existing entry from the database
        const matchedWorryEntryDatabase = await pb
          .collection('worry_entries')
          .getFirstListItem(`uuid="${matchedWorryEntry.uuid}"`, {
            requestKey: null, // prevents auto-cancelling duplicate pending requests
          });

        // Update the existing entry in the database
        await pb
          .collection('worry_entries')
          .update(matchedWorryEntryDatabase.id, newWorryEntryDatabase);
      } catch (error) {
        console.error('Error updating worry entry:', error);
      }
    } else {
      setWorryEntries((prev) => [newWorryEntry, ...prev]);
      pb.collection('worry_entries').create(newWorryEntryDatabase);
    }
  };

  const deleteWorryEntry = async (uuid: string) => {
    setWorryEntries((prev) => prev.filter((entry) => entry.uuid != uuid));

    try {
      // Get the corresponding entry from the database
      const matchedWorryEntryDatabase = await pb
        .collection('worry_entries')
        .getFirstListItem(`uuid="${uuid}"`);

      // Delete the existing entry from the database
      await pb.collection('worry_entries').delete(matchedWorryEntryDatabase.id);
    } catch (error) {
      console.error('Error deleting worry entry:', error);
    }
  };

  const updateWorryEntryFields = (
    uuid: string,
    category: Category,
    priority: Priority,
    title: string,
    description: string
  ) => {
    setUuid(uuid);
    setCategory(category);
    setPriority(priority);
    setTitle(title);
    setDescription(description);
  };

  const resetWorryEntryFields = () => {
    setUuid('');
    setCategory(Category.Work);
    setPriority(Priority.None);
    setDate(new Date());
    setTitle('');
    setDescription('');
    setReframed(false);
  };

  return (
    <WorryContext.Provider
      value={{
        worryEntries,
        uuid,
        category,
        priority,
        date,
        title,
        description,
        reframed,
        setWorryEntries,
        setUuid,
        setCategory,
        setPriority,
        setDate,
        setTitle,
        setDescription,
        setReframed,
        createWorryEntry,
        deleteWorryEntry,
        updateWorryEntryFields,
        resetWorryEntryFields,
      }}
    >
      {children}
    </WorryContext.Provider>
  );
};
