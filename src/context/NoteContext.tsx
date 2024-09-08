import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { INoteContext, Category, INoteEntry } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';
import { WorryContext } from './WorryContext';

// Create context
export const NoteContext = createContext<INoteContext>({
  noteEntries: [],
  isChecked: false,
  uuid: '',
  feelingDescription: '',
  thoughtLikelihoodSliderOne: 1,
  forThoughtEvidence: '',
  againstThoughtEvidence: '',
  friendAdvice: '',
  thoughtLikelihoodSliderTwo: 1,
  thoughtLikelihood: '',
  alternativePerspective: '',
  setNoteEntries: () => {},
  setIsChecked: () => {},
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
  resetNoteEntryFields: () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [noteEntries, setNoteEntries] = useState<INoteEntry[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const [uuid, setUuid] = useState<string>('');
  // @TODO Isn't there a better way of doing this? For example a `reframingTextValues`and `reframingSlidersValues` mappings?
  const [feelingDescription, setFeelingDescription] = useState<string>('');
  const [thoughtLikelihoodSliderOne, setThoughtLikelihoodSliderOne] =
    useState<number>(2);
  const [forThoughtEvidence, setForThoughtEvidence] = useState<string>('');
  const [againstThoughtEvidence, setAgainstThoughtEvidence] =
    useState<string>('');
  const [friendAdvice, setFriendAdvice] = useState<string>('');
  const [thoughtLikelihoodSliderTwo, setThoughtLikelihoodSliderTwo] =
    useState<number>(2);
  const [thoughtLikelihood, setThoughtLikelihood] = useState<string>('');
  const [alternativePerspective, setAlternativePerspective] =
    useState<string>('');

  const { user } = useContext(AuthContext);
  const { category, title, description } = useContext(WorryContext);

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

  const resetNoteEntryFields = () => {
    setIsChecked(true);
    setFeelingDescription('');
    setThoughtLikelihoodSliderOne(2);
    setForThoughtEvidence('');
    setAgainstThoughtEvidence('');
    setFriendAdvice('');
    setThoughtLikelihoodSliderTwo(2);
    setThoughtLikelihood('');
    setAlternativePerspective('');
  };

  // @TODO Is this the right place for this to happen? Does it need to be moved to `WorryContext`?
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
        isChecked,
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
        setIsChecked,
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
        resetNoteEntryFields,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
