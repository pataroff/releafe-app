import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Priority, IWorryContext, IWorryEntry } from '../types';

import pb from '../lib/pocketbase';

import { useAuth } from './AuthContext';

const WorryContext = createContext<IWorryContext | undefined>(undefined);

export const useWorry = () => {
  const context = useContext(WorryContext);
  if (!context) {
    throw new Error('useWorry must be used within a WorryProvider');
  }
  return context;
};

export const WorryProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [worryEntries, setWorryEntries] = useState<IWorryEntry[]>([]);
  const [uuid, setUuid] = useState<string>('');
  const [category, setCategory] = useState<Category>(Category.Work);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchWorryEntries = async () => {
      if (!user) return;

      try {
        const res = await pb.collection('worry_entries').getList(1, 50, {
          filter: `user.id='${user.id}'`,
          sort: '-date',
        });

        const formatted = res.items.map((item) => ({
          id: item.id,
          uuid: item.uuid,
          category: item.category,
          priority: item.priority,
          date: new Date(item.date),
          title: item.title,
          description: item.description,
        }));

        setWorryEntries(formatted);
      } catch (err) {
        console.error('Failed to fetch worry entries:', err);
      }
    };

    fetchWorryEntries();
  }, [user]);

  const createOrUpdateWorryEntry = (): IWorryEntry => {
    const matchedWorryEntry = worryEntries.find((entry) => entry.uuid === uuid);
    const newUuid = matchedWorryEntry?.uuid ?? uuidv4();

    const newWorryEntry: IWorryEntry = {
      uuid: newUuid,
      category,
      priority,
      date,
      title,
      description,
    };

    const newWorryEntryDatabase = {
      uuid: newUuid,
      user: user?.id,
      category,
      priority,
      date,
      title,
      description,
    };

    if (matchedWorryEntry) {
      const index = worryEntries.indexOf(matchedWorryEntry);
      setWorryEntries((prev) => {
        const updated = [...prev];
        updated[index] = newWorryEntry;
        return updated;
      });

      updateWorryEntryInDatabase(newUuid, newWorryEntryDatabase);
    } else {
      setUuid(newUuid); // @INFO This is needed in case the user wants to reframe immediately post-creation!
      setWorryEntries((prev) => [newWorryEntry, ...prev]);
      createWorryEntryInDatabase(newWorryEntryDatabase);
    }

    return newWorryEntry;
  };

  const updateWorryEntryInDatabase = async (uuid: string, entry: any) => {
    try {
      const matched = await pb
        .collection('worry_entries')
        .getFirstListItem(`uuid="${uuid}"`, { requestKey: null });
      await pb.collection('worry_entries').update(matched.id, entry);
    } catch (error) {
      console.error('Failed to update worry entry in DB:', error);
    }
  };

  const createWorryEntryInDatabase = async (entry: any) => {
    try {
      await pb.collection('worry_entries').create(entry);
    } catch (error) {
      console.error('Failed to create worry entry in DB:', error);
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

  const updateWorryEntryFields = async (
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
        setWorryEntries,
        setUuid,
        setCategory,
        setPriority,
        setDate,
        setTitle,
        setDescription,
        createOrUpdateWorryEntry,
        deleteWorryEntry,
        updateWorryEntryFields,
        resetWorryEntryFields,
      }}
    >
      {children}
    </WorryContext.Provider>
  );
};
