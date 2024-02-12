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

import { GlobalContext } from '../context/GlobalState';

export const DiaryEntry: React.FC<{ diaryEntry: IDiaryEntry }> = ({
  diaryEntry,
}) => {
  const { deleteDiaryEntry } = useContext(GlobalContext);

  return (
    <View style={styles.listItem}>
      <Text style={styles.diaryEntryTitle}>{diaryEntry.title}</Text>
      <Text style={styles.diaryEntryBody}>{diaryEntry.body}</Text>
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
    alignItems: 'center',
    position: 'relative',
    marginVertical: 2,
    paddingRight: 20,
  },
  diaryEntryTitle: {
    margin: 0,
    fontSize: 20,
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  diaryEntryBody: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 20,
    letterSpacing: 1,
    marginTop: 5,
    marginHorizontal: 0,
  } as TextStyle,
  transactionPlus: {
    color: '#2ecc71',
  },
  transactionMinus: {
    color: '#c0392b',
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    paddingTop: 2,
    paddingHorizontal: 5,
  },
  deleteButtonText: {
    ...Fonts.poppinsLight[Platform.OS],
  } as TextStyle,
});
