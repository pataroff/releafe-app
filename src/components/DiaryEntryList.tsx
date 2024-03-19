import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextStyle,
  Platform,
} from 'react-native';
import { Fonts, Typography } from '../styles';
import { DiaryEntry } from './DiaryEntry';

import { GlobalContext } from '../context/DiaryContext';

export const DiaryEntryList: React.FC = () => {
  const { state } = useContext(GlobalContext);
  const { diaryEntries } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.diaryEntriesLabel}>Diary Entries</Text>
      {diaryEntries.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>
            You have not added any diary entries yet.
          </Text>
        </View>
      ) : (
        <View style={styles.flatListContainer}>
          <FlatList
            data={diaryEntries}
            renderItem={({ item: diaryEntry }) => (
              <DiaryEntry diaryEntry={diaryEntry} />
            )}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 125,
    width: 350,
    marginBottom: 40,
  },
  flatListContainer: {
    height: 125,
    width: 350,
  },
  diaryEntriesLabel: {
    ...Typography.h3,
  } as TextStyle,
  emptyListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 40,
  },
  emptyListText: {
    ...Fonts.poppinsLight[Platform.OS],
  } as TextStyle,
});
