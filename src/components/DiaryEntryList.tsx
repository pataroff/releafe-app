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

import { GlobalContext } from '../context/GlobalState';

export const DiaryEntryList: React.FC = () => {
  const { state } = useContext(GlobalContext);
  const { diaryEntries } = state;

  return (
    <View>
      <Text style={styles.transactionsLabel}>Diary Entries</Text>
      {diaryEntries.length === 0 ? (
        <View style={styles.list}>
          <Text style={styles.emptyListText}>
            You have not added any diary entries yet.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={diaryEntries}
          renderItem={({ item: diaryEntry }) => (
            <DiaryEntry diaryEntry={diaryEntry} />
          )}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsLabel: {
    ...Typography.h3,
  } as TextStyle,
  list: {
    width: 350,
    padding: 0,
  },
  emptyListText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ...Fonts.poppinsLight[Platform.OS],
  } as TextStyle,
});
