import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Priority, IWorryListItem, IWorryContext } from '../types';

import pb from '../lib/pocketbase';

import { useAuth } from './AuthContext';
import { useNote } from './NoteContext';

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
  // const { updateNoteEntryFields } = useNote(); // @TODO How do we solve this?

  const [worryEntries, setWorryEntries] = useState<IWorryListItem[]>([]);
  const [uuid, setUuid] = useState<string>('');
  const [category, setCategory] = useState<Category>(Category.Work);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [reframed, setReframed] = useState<boolean>(false);

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
          reframed: item.reframed,
        }));

        setWorryEntries(formatted);
      } catch (err) {
        console.error('Failed to fetch worry entries:', err);
      }
    };

    fetchWorryEntries();
  }, [user]);

  const createWorryEntry = async (noteEntryUuid?: string) => {
    let noteEntry = null;

    if (noteEntryUuid) {
      noteEntry = await getNoteEntryId(noteEntryUuid);
    }

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
      note: noteEntry?.id,
      category,
      priority,
      date,
      title,
      description,
      reframed,
    };

    // @TODO We need the uuid set if the user wants to reframe immediately after the creation of a worry!
    setUuid(newWorryEntry.uuid);

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

  // Helper functions
  const getNoteEntryId = async (worryEntryUuid: string) => {
    try {
      // Fetch the worry entry by UUID
      const matchedWorryEntryDatabase = await pb
        .collection('worry_entries')
        .getFirstListItem(`uuid="${worryEntryUuid}"`);

      if (!matchedWorryEntryDatabase) {
        console.error('No worry entry found with the provided UUID.');
        return null;
      }

      // Fetch the note entry using the worry entry ID
      const matchedNoteEntryDatabase = await pb
        .collection('note_entries')
        .getFirstListItem(`worry="${matchedWorryEntryDatabase.id}"`);

      if (!matchedNoteEntryDatabase) {
        console.error('No note entry found for the provided worry entry.');
        return null;
      }
      // Return the matched note entry
      return matchedNoteEntryDatabase;
    } catch (error) {
      console.error('Error fetching note entry: ', error);
      return null;
    }
  };

  const updateWorryEntryFields = async (
    uuid: string,
    category: Category,
    priority: Priority,
    title: string,
    description: string,
    reframed?: boolean
  ) => {
    setUuid(uuid);
    setCategory(category);
    setPriority(priority);
    setTitle(title);
    setDescription(description);

    // If a `worry_entry` is `reframed`, then a corresponding note should exist, get that note and it's values
    if (reframed) {
      const noteEntry = await getNoteEntryId(uuid);

      if (noteEntry) {
        const {
          uuid,
          feelingDescription,
          thoughtLikelihoodSliderOne,
          forThoughtEvidence,
          againstThoughtEvidence,
          friendAdvice,
          thoughtLikelihoodSliderTwo,
          thoughtLikelihood,
          alternativePerspective,
          mediaFile,
        } = noteEntry;

        updateNoteEntryFields(
          uuid, // noteEntry.uuid
          feelingDescription,
          thoughtLikelihoodSliderOne,
          forThoughtEvidence,
          againstThoughtEvidence,
          friendAdvice,
          thoughtLikelihoodSliderTwo,
          thoughtLikelihood,
          alternativePerspective,
          mediaFile
        );
      }
    }
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
