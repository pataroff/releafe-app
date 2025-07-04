import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

import { MediaFile, INoteContext, INoteEntry } from '../types';

import pb from '../lib/pocketbase';
import { useAuth } from './AuthContext';
import { useWorry } from './WorryContext';

// Create context
const NoteContext = createContext<INoteContext | undefined>(undefined);

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error('useNote must be used within a NoteProvider');
  return context;
};

export const NoteProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [noteEntries, setNoteEntries] = useState<INoteEntry[]>([]);
  const [uuid, setUuid] = useState<string>('');
  // Text State
  const [feelingDescription, setFeelingDescription] = useState<string>('');
  const [forThoughtEvidence, setForThoughtEvidence] = useState<string>('');
  const [againstThoughtEvidence, setAgainstThoughtEvidence] =
    useState<string>('');
  const [friendAdvice, setFriendAdvice] = useState<string>('');
  const [thoughtLikelihood, setThoughtLikelihood] = useState<string>('');
  const [alternativePerspective, setAlternativePerspective] =
    useState<string>('');

  // Slider State
  const thoughtLikelihoodSliderOne = useSharedValue(5);
  const thoughtLikelihoodSliderTwo = useSharedValue(5);

  const setThoughtLikelihoodSliderOne = (val: number) => {
    thoughtLikelihoodSliderOne.value = val;
  };
  const setThoughtLikelihoodSliderTwo = (val: number) => {
    thoughtLikelihoodSliderTwo.value = val;
  };

  // Special State
  const [mediaFile, setMediaFile] = useState<MediaFile | string>('');
  const [audioMetering, setAudioMetering] = useState<number[]>([]);

  const { user } = useAuth();
  const { category, priority, title, description } = useWorry();

  useEffect(() => {
    const fetchNoteEntries = async () => {
      if (!user) return;

      try {
        const res = await pb.collection('note_entries').getList(1, 50, {
          filter: `user.id='${user.id}'`,
          sort: '-created',
          expand: 'user',
        });

        const formatted: INoteEntry[] = res.items.map((item) => {
          const {
            id,
            uuid,
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
          } = item;
          return {
            id,
            uuid,
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
        });

        setNoteEntries(formatted);
      } catch (error) {
        console.error('Error fetching note entries:', error);
      }
    };

    fetchNoteEntries();
  }, [user]);

  const createOrUpdateNoteEntry = (): INoteEntry => {
    const matchedNoteEntry = noteEntries.find((entry) => entry.uuid === uuid);
    const newUuid = matchedNoteEntry?.uuid ?? uuidv4();

    const newNoteEntry = {
      uuid: newUuid,
      category,
      priority,
      title,
      description,
      feelingDescription,
      thoughtLikelihoodSliderOne: thoughtLikelihoodSliderOne.value,
      forThoughtEvidence,
      againstThoughtEvidence,
      friendAdvice,
      thoughtLikelihoodSliderTwo: thoughtLikelihoodSliderTwo.value,
      thoughtLikelihood,
      alternativePerspective,
      mediaFile,
      audioMetering,
    };

    const newNoteEntryDatabase = {
      uuid: newUuid,
      user: user?.id,
      category,
      priority,
      title,
      description,
      feelingDescription,
      thoughtLikelihoodSliderOne: thoughtLikelihoodSliderOne.value,
      forThoughtEvidence,
      againstThoughtEvidence,
      friendAdvice,
      thoughtLikelihoodSliderTwo: thoughtLikelihoodSliderTwo.value,
      thoughtLikelihood,
      alternativePerspective,
      mediaFile,
      audioMetering,
    };

    if (matchedNoteEntry) {
      const index = noteEntries.indexOf(matchedNoteEntry);
      setNoteEntries((prev) => {
        const updated = [...prev];
        updated[index] = newNoteEntry;
        return updated;
      });

      updateNoteEntryInDatabase(newUuid, newNoteEntryDatabase);
    } else {
      setNoteEntries((prev) => [newNoteEntry, ...prev]);
      createNoteEntryInDatabase(newNoteEntryDatabase);
    }
    return newNoteEntry;
  };

  const updateNoteEntryInDatabase = async (uuid: string, entry: any) => {
    try {
      const matched = await pb
        .collection('note_entries')
        .getFirstListItem(`uuid="${uuid}"`, { requestKey: null });

      const isValidFileObject =
        typeof mediaFile === 'object' &&
        mediaFile.uri &&
        mediaFile.name &&
        mediaFile.type;

      const isEmptyFileObject =
        typeof mediaFile === 'object' &&
        mediaFile.uri === '' &&
        mediaFile.name === '' &&
        mediaFile.type === '';

      if (isValidFileObject) {
        const formData = new FormData();
        appendNoteFormData(formData, entry);
        await pb.collection('note_entries').update(matched.id, formData);
      } else if (isEmptyFileObject) {
        const { audioMetering, ...cleanEntry } = entry;
        await pb.collection('note_entries').update(matched.id, {
          ...cleanEntry,
          mediaFile: null,
        });
      } else {
        const { mediaFile, audioMetering, ...cleanEntry } = entry;
        await pb.collection('note_entries').update(matched.id, cleanEntry);
      }
    } catch (error) {
      console.error('Failed to update note entry in DB:', error);
    }
  };

  const createNoteEntryInDatabase = async (entry: any) => {
    try {
      const hasMedia =
        entry.mediaFile?.uri && entry.mediaFile?.type && entry.mediaFile?.name;

      if (hasMedia) {
        const formData = new FormData();
        appendNoteFormData(formData, entry);
        await pb.collection('note_entries').create(formData);
      } else {
        const { mediaFile, audioMetering, ...cleanEntry } = entry;
        await pb.collection('note_entries').create(cleanEntry);
      }
    } catch (error) {
      console.error('Failed to create note entry in DB:', error);
    }
  };

  const appendNoteFormData = (formData: FormData, entry: any) => {
    formData.append('uuid', entry.uuid);
    formData.append('user', entry.user);

    formData.append('category', entry.category);
    formData.append('priority', entry.priority);
    formData.append('title', entry.title);
    formData.append('description', entry.description);
    formData.append('feelingDescription', entry.feelingDescription);
    formData.append(
      'thoughtLikelihoodSliderOne',
      entry.thoughtLikelihoodSliderOne.toString()
    );
    formData.append('forThoughtEvidence', entry.forThoughtEvidence);
    formData.append('againstThoughtEvidence', entry.againstThoughtEvidence);
    formData.append('friendAdvice', entry.friendAdvice);
    formData.append(
      'thoughtLikelihoodSliderTwo',
      entry.thoughtLikelihoodSliderTwo.toString()
    );
    formData.append('thoughtLikelihood', entry.thoughtLikelihood);
    formData.append('alternativePerspective', entry.alternativePerspective);

    if (entry.mediaFile) {
      formData.append('mediaFile', entry.mediaFile);

      if (entry.mediaFile.name?.startsWith('recording')) {
        formData.append('audioMetering', JSON.stringify(entry.audioMetering));
      }
    }
  };

  const deleteNoteEntry = async (uuid: string) => {
    setNoteEntries((prev) => prev.filter((entry) => entry.uuid != uuid));

    try {
      const matchedNoteEntryDatabase = await pb
        .collection('note_entries')
        .getFirstListItem(`uuid="${uuid}"`);

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
    mediaFile: MediaFile,
    audioMetering: number[]
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
    setAudioMetering(audioMetering);
  };

  const getNoteEntryMediaFileUrl = async (
    uuid: string
  ): Promise<string | undefined> => {
    try {
      const record = await pb
        .collection('note_entries')
        .getFirstListItem(`uuid="${uuid}"`, { requestKey: null });

      return pb.files.getURL(record, record.mediaFile);
    } catch (error) {
      console.error('Failed to generate file URL:', error);
      return undefined;
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
        createOrUpdateNoteEntry,
        deleteNoteEntry,
        updateNoteEntryFields,
        resetNoteEntryFields,
        getNoteEntryMediaFileUrl,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
