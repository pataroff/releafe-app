import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  TextStyle,
  Pressable,
} from 'react-native';

import { Fonts } from '../styles';
import { INoteEntry } from '../types';

import { AuthContext } from '../context/AuthContext';
import { NoteContext } from '../context/NoteContext';

import { NoteListItem } from './NoteListItem';

import pb from '../lib/pocketbase';

export const NoteList = () => {
  const { user } = useContext(AuthContext);
  const { noteEntries, setNoteEntries } = useContext(NoteContext);

  useEffect(() => {
    const fetchNoteEntries = async () => {
      if (user) {
        try {
          const noteEntriesList = await pb
            .collection('note_entries')
            .getList(1, 50, {
              filter: `user.id='${user.id}'`,
              sort: '-created',
              expand: 'user',
            });

          const modifiedNoteEntriesList: INoteEntry[] =
            noteEntriesList.items.map((item) => {
              const {
                id,
                uuid,
                worry,
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
              } = item;
              return {
                id,
                uuid,
                worry,
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
            });

          setNoteEntries(modifiedNoteEntriesList);
        } catch (error) {
          console.error('Error fetching note entries:', error);
        }
      }
    };

    fetchNoteEntries();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.noteListContainer}
      contentContainerStyle={styles.noteListContentContainer}
    >
      {noteEntries.length > 0 ? (
        noteEntries.map((item) => {
          return <NoteListItem key={item.uuid} item={item} />;
        })
      ) : (
        <>
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataTitleText}>Geen notities</Text>
            <Text style={styles.noDataDescriptionText}>
              Je hebt nog geen notities opgeslagen. Klik hieronder om je eerste
              notitie te maken.
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noteListContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  noteListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    rowGap: 5,
    marginHorizontal: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    paddingHorizontal: 30,
  },
  noDataTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
});
