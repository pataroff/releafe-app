import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextStyle,
  Pressable,
} from 'react-native';
import { Fonts } from '../styles';
import { IDiaryEntry } from '../types';

import { GlobalContext } from '../context/DiaryContext';

export const DiaryEntry: React.FC<{ diaryEntry: IDiaryEntry }> = ({
  diaryEntry,
}) => {
  const { deleteDiaryEntry } = useContext(GlobalContext);

  return (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.diaryEntryTitle}>{diaryEntry.title}</Text>
        <Text style={styles.diaryEntryBody}>{diaryEntry.body}</Text>
      </View>
      <Text style={styles.diaryEntryType}>{diaryEntry.type}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteDiaryEntry(diaryEntry.id)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    color: '#333',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    paddingRight: 20,
  },
  diaryEntryTitle: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 20,
    margin: 0,
  } as TextStyle,
  diaryEntryBody: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 16,
    marginTop: 5,
    marginHorizontal: 0,
  } as TextStyle,
  diaryEntryType: {
    ...Fonts.poppinsLight[Platform.OS],
    fontSize: 14,
    marginTop: 0,
    paddingTop: 2,
  } as TextStyle,
  deleteButton: {
    position: 'absolute',
    right: 0,
    paddingTop: 3,
    paddingHorizontal: 5,
  },
  deleteButtonText: {
    ...Fonts.poppinsLight[Platform.OS],
  } as TextStyle,
});
