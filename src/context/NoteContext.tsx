import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { INoteContext, Category, INoteEntry } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

// Create context
export const NoteContext = createContext<INoteContext>({
  noteEntries: [],
  uuid: '',
  category: Category.Work,
  title: '',
  situationDescription: '',
  feelingDescription: '',
  thoughtLikelihoodSliderOne: 1,
  forThoughtEvidence: '',
  againstThoughtEvidence: '',
  friendAdvice: '',
  thoughtLikelihoodSliderTwo: 1,
  thoughtLikelihood: '',
  alternativePerspective: '',
  setNoteEntries: () => {},
  setUuid: () => {},
  setCategory: () => {},
  setTitle: () => {},
  setSituationDescription: () => {},
  setFeelingDescription: () => {},
  setThoughtLikelihoodSliderOne: () => {},
  setForThoughtEvidence: () => {},
  setAgainstThoughtEvidence: () => {},
  setFriendAdvice: () => {},
  setThoughtLikelihoodSliderTwo: () => {},
  setThoughtLikelihood: () => {},
  setAlternativePerspective: () => {},
  resetNoteEntryFields: () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [noteEntries, setNoteEntries] = useState<INoteEntry[]>([]);
  const [uuid, setUuid] = useState<string>('');
  // These fields are from the `WorryEntry`!
  const [category, setCategory] = useState<Category>(Category.Work);
  const [title, setTitle] = useState<string>('');
  const [situationDescription, setSituationDescription] = useState<string>('');

  // @TODO Isn't there a better way of doing this? For example a `reframingTextValues`and `reframingSlidersValues` mappings?
  const [feelingDescription, setFeelingDescription] = useState<string>('');
  const [thoughtLikelihoodSliderOne, setThoughtLikelihoodSliderOne] =
    useState<number>(0);
  const [forThoughtEvidence, setForThoughtEvidence] = useState<string>('');
  const [againstThoughtEvidence, setAgainstThoughtEvidence] =
    useState<string>('');
  const [friendAdvice, setFriendAdvice] = useState<string>('');
  const [thoughtLikelihoodSliderTwo, setThoughtLikelihoodSliderTwo] =
    useState<number>(0);
  const [thoughtLikelihood, setThoughtLikelihood] = useState<string>('');
  const [alternativePerspective, setAlternativePerspective] =
    useState<string>('');

  const { user } = useContext(AuthContext);

  const resetNoteEntryFields = () => {
    setFeelingDescription('');
    setThoughtLikelihoodSliderOne(0);
    setForThoughtEvidence('');
    setAgainstThoughtEvidence('');
    setFriendAdvice('');
    setThoughtLikelihoodSliderTwo(0);
    setThoughtLikelihood('');
    setAlternativePerspective('');
  };

  return (
    <NoteContext.Provider
      value={{
        noteEntries,
        uuid,
        category,
        title,
        situationDescription,
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
        setCategory,
        setTitle,
        setSituationDescription,
        setFeelingDescription,
        setThoughtLikelihoodSliderOne,
        setForThoughtEvidence,
        setAgainstThoughtEvidence,
        setFriendAdvice,
        setThoughtLikelihoodSliderTwo,
        setThoughtLikelihood,
        setAlternativePerspective,
        resetNoteEntryFields,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
