import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { Category, INoteEntry } from '../types';

import { useNavigation } from '@react-navigation/native';

import { NoteListItemExpandedModal } from './NoteListItemExpandedModal';
import { ReframingModal } from './ReframingModal';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome6';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={28} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={28} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={28} color='black' />;
  }
};

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
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
