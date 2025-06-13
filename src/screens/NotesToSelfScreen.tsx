import React, { useState } from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';
import { INoteEntry } from '../types';
import Entypo from '@expo/vector-icons/Entypo';

import { NoteList } from '../components/NoteList';
import { NoteListItemAddModal } from '../components/NoteListItemAddModal';
import { NoteListItemExpandedModal } from '../components/NoteListItemExpandedModal';
import { ReframingModal } from '../components/ReframingModal';

const windowWidth = Dimensions.get('window').width;

export const NotesToSelfScreen: React.FC<{ route: any }> = ({ route }) => {
  const [modalNoteListItemAddVisible, setModalNoteListItemAddVisible] =
    useState<boolean>(false);
  const [
    modalNoteListItemExpandedVisible,
    setModalNoteListItemExpandedVisible,
  ] = useState<boolean>(false);
  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);
  const [selectedNote, setSelectedNote] = useState<INoteEntry | null>(null);

  return (
    <>
      <NoteListItemAddModal
        modalNoteListItemAddVisible={modalNoteListItemAddVisible}
        setModalNoteListItemAddVisible={setModalNoteListItemAddVisible}
      />
      {selectedNote && (
        <NoteListItemExpandedModal
          modalNoteListItemExpandedVisible={modalNoteListItemExpandedVisible}
          setModalNoteListItemExpandedVisible={
            setModalNoteListItemExpandedVisible
          }
          modalReframingVisible={modalReframingVisible}
          setModalReframingVisible={setModalReframingVisible}
          selectedNote={selectedNote}
          modalNoteListItemAddVisible={modalNoteListItemAddVisible}
          setModalNoteListItemAddVisible={setModalNoteListItemAddVisible}
        />
      )}
      <ReframingModal
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Berichten aan jezelf</Text>
          <Text style={styles.headersDescriptionText}>
            Hier bewaar je berichten aan jezelf. Die kun je op elk moment
            teruglezen of beluisteren, wanneer jij dat nodig hebt.
            <Text
              style={{ ...Fonts.sofiaProSemiBold[Platform.OS] } as TextStyle}
            >
              {'\n\n'}Tip:{' '}
            </Text>
            Je kunt ook iemand die je lief hebt vragen om een bericht voor je te
            maken.
          </Text>

          {/* Headers Inner Container */}
          <View style={styles.headersInnerContainer}>
            <View style={{ width: '80%' }}>
              <Text style={styles.headersHeadingText}>Mijn berichten</Text>
              <Text style={styles.headersDescriptionText}>
                Bekijk hier jouw opgeslagen berichten, of maak een nieuw bericht
                via de + knop.
              </Text>
            </View>
            {/* Add Button */}
            <Pressable
              style={styles.addButton}
              onPress={() =>
                setModalNoteListItemAddVisible(!modalNoteListItemAddVisible)
              }
            >
              <Entypo name='plus' size={32} color='#5C6B57' />
            </Pressable>
          </View>
        </View>

        {/* Note List */}
        <NoteList
          route={route}
          setSelectedNote={setSelectedNote}
          modalNoteListItemExpandedVisible={modalNoteListItemExpandedVisible}
          setModalNoteListItemExpandedVisible={
            setModalNoteListItemExpandedVisible
          }
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
    lineHeight: 18,
    marginTop: 10,
  } as TextStyle,
  addButton: {
    borderRadius: 15,
    height: 50,
    width: 50,
    backgroundColor: '#E5F1E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
