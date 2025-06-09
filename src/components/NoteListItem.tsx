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

import { useNavigation } from '@react-navigation/native';

import { NoteListItemExpandedModal } from './NoteListItemExpandedModal';
import { ReframingModal } from './ReframingModal';

import Entypo from '@expo/vector-icons/Entypo';
import { getCategory } from '../utils/worry';

export const NoteListItem: React.FC<{ item: INoteEntry; route: any }> = ({
  item,
  route,
}) => {
  const navigation = useNavigation();
  const { title, category } = item;

  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  const [
    modalNoteListItemExpandedVisible,
    setModalNoteListItemExpandedVisible,
  ] = useState<boolean>(false);

  return (
    <>
      <NoteListItemExpandedModal
        modalNoteListItemExpandedVisible={modalNoteListItemExpandedVisible}
        setModalNoteListItemExpandedVisible={
          setModalNoteListItemExpandedVisible
        }
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        item={item}
      />
      {/* @TODO This is here due to the editing functionality! */}
      <ReframingModal
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
      />

      <Pressable
        onPress={() =>
          setModalNoteListItemExpandedVisible(!modalNoteListItemExpandedVisible)
        }
        style={styles.container}
      >
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
