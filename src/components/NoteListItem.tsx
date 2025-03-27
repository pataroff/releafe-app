import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  TextStyle,
  Image
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
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_work.png')} />;
    case Category.Health:
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_gezin_en_relaties.png')} />;
    case Category.Relationships:
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_gezin_en_relaties.png')} />;
    case Category.Education:
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_onderwijs.png')} />
    case Category.Finance:
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_financien.png')} />
    case Category.Other:
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_overig.png')} />
    default: 
      return <Image style = {{paddingLeft:18, paddingRight:10,height:24,maxHeight:36,width:24,maxWidth:36,}} 
          source= {require('../../assets/images/dropdown_icons/dropdown_icon_overig.png')} />
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
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
