import React, { useContext } from 'react';
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

import { NoteContext } from '../context/NoteContext';

import { NoteListItem } from './NoteListItem';

export const NoteList: React.FC<{ route: any }> = ({ route }) => {
  const { noteEntries } = useContext(NoteContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.noteListContainer}
      contentContainerStyle={styles.noteListContentContainer}
    >
      {noteEntries.length > 0 ? (
        noteEntries.map((item) => {
          return <NoteListItem route={route} key={item.uuid} item={item} />;
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
    rowGap: 10,
    marginHorizontal: 30,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  noDataTitleText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
});
