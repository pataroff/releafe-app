import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { INoteContext, Priority, INoteEntry } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';
import { WorryContext } from './WorryContext';

// Create context
export const NoteContext = createContext<INoteContext>({
  noteEntries: [],
  uuid: '',
  feelingDescription: '',
  thoughtLikelihoodSliderOne: 5,
  forThoughtEvidence: '',
  againstThoughtEvidence: '',
  friendAdvice: '',
  thoughtLikelihoodSliderTwo: 5,
  thoughtLikelihood: '',
  alternativePerspective: '',
  setNoteEntries: () => {},
  setUuid: () => {},
  setFeelingDescription: () => {},
  setThoughtLikelihoodSliderOne: () => {},
  setForThoughtEvidence: () => {},
  setAgainstThoughtEvidence: () => {},
  setFriendAdvice: () => {},
  setThoughtLikelihoodSliderTwo: () => {},
  setThoughtLikelihood: () => {},
  setAlternativePerspective: () => {},
  createNoteEntry: () => {},
  deleteNoteEntry: () => {},
  updateNoteEntryFields: () => {},
  resetNoteEntryFields: () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [noteEntries, setNoteEntries] = useState<INoteEntry[]>([]);

  const [uuid, setUuid] = useState<string>('');
  const [feelingDescription, setFeelingDescription] = useState<string>('');
  const [thoughtLikelihoodSliderOne, setThoughtLikelihoodSliderOne] =
    useState<number>(5);
  const [forThoughtEvidence, setForThoughtEvidence] = useState<string>('');
  const [againstThoughtEvidence, setAgainstThoughtEvidence] =
    useState<string>('');
  const [friendAdvice, setFriendAdvice] = useState<string>('');
  const [thoughtLikelihoodSliderTwo, setThoughtLikelihoodSliderTwo] =
    useState<number>(5);
  const [thoughtLikelihood, setThoughtLikelihood] = useState<string>('');
  const [alternativePerspective, setAlternativePerspective] =
    useState<string>('');

  const { user } = useContext(AuthContext);
  const { category, priority, title, description } = useContext(WorryContext);

  const createNoteEntry = async (worryEntryUuid?: string) => {
    let worryEntry = null;

    if (worryEntryUuid) {
      worryEntry = await getWorryEntryId(worryEntryUuid);
    }

    // @TODO Set `uuid` prior to calling `createNoteEntry`, otherwise it points to an empty string!
    const matchedNoteEntry = noteEntries.find((entry) => entry.uuid == uuid);

    const newNoteEntry = {
      id: '',
      uuid: uuidv4(),
      category,
      priority,
      title,
      description,
      feelingDescription,
      thoughtLikelihoodSliderOne,
      forThoughtEvidence,
      againstThoughtEvidence,
      friendAdvice,
      thoughtLikelihoodSliderTwo,
      thoughtLikelihood,
      alternativePerspective,
    };

    const newNoteEntryDatabase = {
      id: '',
      uuid: newNoteEntry.uuid,
      // @ts-ignore 'user' is possibly 'null'!
      user: user.id,
      worry: worryEntry?.id,
      category,
      priority,
      title,
      description,
      feelingDescription,
      thoughtLikelihoodSliderOne,
      forThoughtEvidence,
      againstThoughtEvidence,
      friendAdvice,
      thoughtLikelihoodSliderTwo,
      thoughtLikelihood,
      alternativePerspective,
    };

    if (matchedNoteEntry) {
      const index = noteEntries.indexOf(matchedNoteEntry);

      setNoteEntries((prev) => {
        const updatedEntries = [...prev];
        updatedEntries[index] = newNoteEntry;
        return updatedEntries;
      });

      try {
        const matchedNoteEntryDatabase = await pb
          .collection('note_entries')
          .getFirstListItem(`uuid="${matchedNoteEntry.uuid}"`);

        await pb
          .collection('note_entries')
          .update(matchedNoteEntryDatabase.id, newNoteEntryDatabase);
      } catch (error) {
        console.error('Error updating note entry: ', error);
      }
    } else {
      setNoteEntries((prev) => [newNoteEntry, ...prev]);
      pb.collection('note_entries').create(newNoteEntryDatabase);
    }
  };

  const deleteNoteEntry = async (uuid: string) => {
    setNoteEntries((prev) => prev.filter((entry) => entry.uuid != uuid));

    try {
      // Get the corresponding entry from the database
      const matchedNoteEntryDatabase = await pb
        .collection('note_entries')
        .getFirstListItem(`uuid="${uuid}"`);

      // Delete the existing entry from the database
      await pb.collection('note_entries').delete(matchedNoteEntryDatabase.id);
    } catch (error) {
      console.error('Error deleting worry entry:', error);
    }
  };

  const resetNoteEntryFields = () => {
    setUuid('');
    setFeelingDescription('');
    setThoughtLikelihoodSliderOne(5);
    setForThoughtEvidence('');
    setAgainstThoughtEvidence('');
    setFriendAdvice('');
    setThoughtLikelihoodSliderTwo(5);
    setThoughtLikelihood('');
    setAlternativePerspective('');
  };

  const updateNoteEntryFields = (
    uuid: string,
    feelingDescription: string,
    thoughtLikelihoodSliderOne: number,
    forThoughtEvidence: string,
    againstThoughtEvidence: string,
    friendAdvice: string,
    thoughtLikelihoodSliderTwo: number,
    thoughtLikelihood: string,
    alternativePerspective: string
  ) => {
    setUuid(uuid);
    setFeelingDescription(feelingDescription);
    setThoughtLikelihoodSliderOne(thoughtLikelihoodSliderOne);
    setForThoughtEvidence(forThoughtEvidence);
    setAgainstThoughtEvidence(againstThoughtEvidence);
    setFriendAdvice(friendAdvice);
    setThoughtLikelihoodSliderTwo(thoughtLikelihoodSliderTwo);
    setThoughtLikelihood(thoughtLikelihood);
    setAlternativePerspective(alternativePerspective);
  };

  const getWorryEntryId = async (worryEntryUuid: string) => {
    try {
      const matchedWorryEntryDatabase = await pb
        .collection('worry_entries')
        .getFirstListItem(`uuid="${worryEntryUuid}"`);
      return matchedWorryEntryDatabase;
    } catch (error) {
      console.error('Error fetching worry entry id: ', error);
      return null;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        noteEntries,
        uuid,
        feelingDescription,
        thoughtLikelihoodSliderOne,
        forThoughtEvidence,
        againstThoughtEvidence,
        friendAdvice,
        thoughtLikelihoodSliderTwo,
        thoughtLikelihood,
        alternativePerspective,
        setNoteEntries,
        setUuid,
        setFeelingDescription,
        setThoughtLikelihoodSliderOne,
        setForThoughtEvidence,
        setAgainstThoughtEvidence,
        setFriendAdvice,
        setThoughtLikelihoodSliderTwo,
        setThoughtLikelihood,
        setAlternativePerspective,
        createNoteEntry,
        deleteNoteEntry,
        updateNoteEntryFields,
        resetNoteEntryFields,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
