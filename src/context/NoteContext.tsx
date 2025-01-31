import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useContext } from 'react';
import { MediaFile, INoteContext, INoteEntry } from '../types';

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
  mediaFile: { uri: '', type: '', name: '' },
  audioMetering: [],
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
  setMediaFile: () => {},
  setAudioMetering: () => {},
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
  const [mediaFile, setMediaFile] = useState<MediaFile>({
    uri: '',
    type: '',
    name: '',
  });
  const [audioMetering, setAudioMetering] = useState<number[]>([]);

  const { user } = useContext(AuthContext);
  const { category, priority, title, description } = useContext(WorryContext);

  const createNoteEntry = async (worryEntryUuid?: string) => {
    let worryEntry = null;

    if (worryEntryUuid) {
      worryEntry = await getWorryEntryId(worryEntryUuid);
    }

    const matchedNoteEntry = noteEntries.find((entry) => entry.uuid == uuid);

    // Create the base newNoteEntry object (same for both update and create)
    const newNoteEntry = {
      id: matchedNoteEntry?.id || '',
      uuid: matchedNoteEntry?.uuid || uuidv4(),
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
      mediaFile,
      audioMetering,
    };

    // @TODO I believe the logic can be separated here into branches depending on `mediaFile` and if it is present or not!
    // Simply said going for the formData approach only if the `mediaFile` is present!

    // Prepare FormData for uploading the media file and other fields
    const formData = new FormData();

    // Append other fields, converting numbers to strings where necessary
    formData.append('uuid', newNoteEntry.uuid);
    formData.append('user', user?.id || '');
    formData.append('worry', worryEntry?.id || '');

    formData.append('category', category);
    formData.append('priority', priority);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('feelingDescription', feelingDescription);
    formData.append(
      'thoughtLikelihoodSliderOne',
      thoughtLikelihoodSliderOne.toString()
    );
    formData.append('forThoughtEvidence', forThoughtEvidence);
    formData.append('againstThoughtEvidence', againstThoughtEvidence);
    formData.append('friendAdvice', friendAdvice);
    formData.append(
      'thoughtLikelihoodSliderTwo',
      thoughtLikelihoodSliderTwo.toString()
    );
    formData.append('thoughtLikelihood', thoughtLikelihood);
    formData.append('alternativePerspective', alternativePerspective);

    // @TODO Is there a better way of doing this? It is required otherwise, the app crashes! See line 96!
    if (mediaFile.uri && mediaFile.type && mediaFile.name) {
      // @ts-expect-error
      formData.append('mediaFile', mediaFile);

      if (mediaFile.name.startsWith('recording')) {
        formData.append('audioMetering', JSON.stringify(audioMetering));
      }
    }

    if (matchedNoteEntry) {
      try {
        // Update existing note entry in the database
        const updatedNoteEntry = await pb
          .collection('note_entries')
          .update(matchedNoteEntry.id, formData);

        // Update the local state with the updated note entry
        setNoteEntries((prev) =>
          prev.map((entry) =>
            entry.uuid === matchedNoteEntry.uuid
              ? {
                  ...newNoteEntry,
                  id: updatedNoteEntry.id,
                  mediaFile: updatedNoteEntry.mediaFile,
                }
              : entry
          )
        );
      } catch (error) {
        console.error('Error updating note entry: ', error);
      }
    } else {
      try {
        // Create a new record in the database
        const createdNoteEntry = await pb
          .collection('note_entries')
          .create(formData);

        // Create the newNoteEntry in local state
        setNoteEntries((prev) => [
          {
            ...newNoteEntry,
            id: createdNoteEntry.id,
            mediaFile: createdNoteEntry.mediaFile,
          },
          ...prev,
        ]);
      } catch (error) {
        console.error('Error creating note entry: ', error);
      }
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
    setMediaFile({ uri: '', type: '', name: '' });
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
    alternativePerspective: string,
    mediaFile: MediaFile
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
    setMediaFile(mediaFile);
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
        mediaFile,
        audioMetering,
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
        setMediaFile,
        setAudioMetering,
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
