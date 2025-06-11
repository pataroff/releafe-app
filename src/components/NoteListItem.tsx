import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  TextStyle,
  Image,
} from 'react-native';

import { Fonts } from '../styles';
import { INoteEntry } from '../types';

import Entypo from '@expo/vector-icons/Entypo';
import { getCategory } from '../utils/worry';

interface NoteListItemProps {
  note: INoteEntry;
  route: any;
  setSelectedNote: React.Dispatch<React.SetStateAction<INoteEntry | null>>;
  modalNoteListItemExpandedVisible: boolean;
  setModalNoteListItemExpandedVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  setSelectedNote,
  modalNoteListItemExpandedVisible,
  setModalNoteListItemExpandedVisible,
}) => {
  const { title, category } = note;

  const handleSelect = () => {
    setSelectedNote(note);
    setModalNoteListItemExpandedVisible(!modalNoteListItemExpandedVisible);
  };

  return (
    <>
      <Pressable onPress={() => handleSelect()} style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 15,
          }}
        >
          {getCategory(category)}
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <Entypo name='chevron-right' size={32} color='#5C6B57' />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C1D6BA',
    borderRadius: 20,
    height: 60,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 10,
  },
  titleText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    flexShrink: 1,
  } as TextStyle,
});
