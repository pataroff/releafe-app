import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Modal,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';
import { INoteEntry } from '../types';

import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator } from 'react-native-paper';

import { useNote } from '../context/NoteContext';
import { useWorry } from '../context/WorryContext';
import { getCategory } from '../utils/worry';

import { Video, ResizeMode } from 'expo-av';
import { MemoItem } from './MemoItem';

import { CloseModal } from './CloseModal';

const windowWidth = Dimensions.get('window').width;

interface NoteListItemExpandedModalProps {
  selectedNote: INoteEntry;
  modalNoteListItemExpandedVisible: boolean;
  setModalNoteListItemExpandedVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalNoteListItemAddVisible: boolean;
  setModalNoteListItemAddVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteListItemExpandedModal: React.FC<
  NoteListItemExpandedModalProps
> = ({
  selectedNote,
  modalNoteListItemExpandedVisible,
  setModalNoteListItemExpandedVisible,
  modalReframingVisible,
  setModalReframingVisible,
  modalNoteListItemAddVisible,
  setModalNoteListItemAddVisible,
}) => {
  const [showUnreframedData, setShowUnreframedData] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  const { getNoteEntryMediaFileUrl, updateNoteEntryFields, deleteNoteEntry } =
    useNote();
  const { updateWorryEntryFields } = useWorry();

  const {
    uuid,
    category,
    priority,
    title,
    description,
    feelingDescription,
    thoughtLikelihoodSliderOne,
    forThoughtEvidence,
    againstThoughtEvidence,
    friendAdvice,
    thoughtLikelihoodSliderTwo,
    thoughtLikelihood,
    alternativePerspective,
    mediaFile,
    audioMetering,
  } = selectedNote;

  useEffect(() => {
    const fetchUrl = async () => {
      // Reset the fileUrl to avoid flash
      setFileUrl('');

      if (mediaFile) {
        const url = await getNoteEntryMediaFileUrl(uuid);

        console.log(url);
        console.log('UUID:', uuid);
        if (url) {
          setFileUrl(url);
        }
      }
    };
    fetchUrl();
  }, [mediaFile]);

  const reframedData = [
    { heading: null, body: alternativePerspective },
    { heading: 'Advies', body: friendAdvice },
    { heading: 'Tegenbewijs', body: againstThoughtEvidence },
    {
      heading: 'Waarschijnlijkheid',
      body: thoughtLikelihood,
      sliderValue: thoughtLikelihoodSliderTwo,
    },
  ];

  const unreframedData = [
    {
      heading: 'Situatieomschrijving',
      body: description,
    },
    {
      heading: 'Gevoelsomschrijving',
      body: feelingDescription,
      sliderValue: thoughtLikelihoodSliderOne,
    },
  ];

  const [modalCloseVisible, setModalCloseVisible] = useState<boolean>(false);

  const handleEdit = () => {
    updateWorryEntryFields(uuid, category, priority, title, description);
    updateNoteEntryFields(
      uuid,
      feelingDescription,
      thoughtLikelihoodSliderOne,
      forThoughtEvidence,
      againstThoughtEvidence,
      friendAdvice,
      thoughtLikelihoodSliderTwo,
      thoughtLikelihood,
      alternativePerspective,
      mediaFile
    );

    setModalNoteListItemExpandedVisible(!modalNoteListItemExpandedVisible);

    if (mediaFile) {
      setModalNoteListItemAddVisible(!modalNoteListItemAddVisible);
    } else {
      setModalReframingVisible(!modalReframingVisible);
    }
  };

  const handleDelete = () => {
    setModalCloseVisible(!modalCloseVisible);
  };

  const handleClose = () => {
    deleteNoteEntry(uuid);
    setModalNoteListItemExpandedVisible(!modalNoteListItemExpandedVisible);
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalNoteListItemExpandedVisible}
      onRequestClose={() =>
        setModalNoteListItemExpandedVisible(!modalNoteListItemExpandedVisible)
      }
    >
      <CloseModal
        closeModalVisible={modalCloseVisible}
        setCloseModalVisible={setModalCloseVisible}
        parentModalVisible={modalNoteListItemExpandedVisible}
        setParentModalVisible={setModalNoteListItemExpandedVisible}
        title='Bericht aan jezelf verwijderen'
        description='Je staat op het punt om het bericht aan jezelf te verwijderen. Weet je het zeker?'
        handleClose={handleClose}
        denyText='Nee, bewaar het bericht'
        confirmText='Ja, verwijder het bericht'
      />
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.headersContainer}>
            {/* Category + Title + Close Button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {/* Category + Title */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}
              >
                {/* Category Container */}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EDF8E9',
                    height: 65,
                    width: 65,
                    borderRadius: 10,
                  }}
                >
                  {getCategory(category)}
                </View>
                <Text style={styles.headersTitleText}>{title}</Text>
              </View>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() =>
                  setModalNoteListItemExpandedVisible(
                    !modalNoteListItemExpandedVisible
                  )
                }
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>
          </View>

          {/* Main Content Container */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={styles.mainContainer}
            contentContainerStyle={styles.mainContentContainer}
          >
            {mediaFile && typeof mediaFile === 'string' ? (
              <>
                <Text style={styles.bodyText}>{description}</Text>

                {!fileUrl ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 30,
                    }}
                  >
                    {/* Loading Spinner */}
                    <ActivityIndicator
                      size={'large'}
                      animating={true}
                      color='#A9C1A1'
                    />
                  </View>
                ) : mediaFile.endsWith('.jpg') || mediaFile.endsWith('.pdf') ? (
                  <Image
                    style={{ width: '100%', height: 400, marginVertical: 20 }}
                    source={{ uri: fileUrl }}
                  />
                ) : mediaFile.startsWith('recording') ? (
                  <View style={{ marginVertical: 20 }}>
                    <MemoItem uri={fileUrl} metering={audioMetering} />
                  </View>
                ) : (
                  <Video
                    source={{ uri: fileUrl }}
                    style={{ width: '100%', height: 400, marginVertical: 20 }}
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    isLooping
                  />
                )}
              </>
            ) : (
              <>
                {/* Reframed Data Container */}
                {reframedData.map((data, index) => {
                  const { heading, body } = data;

                  if (!heading && !body) {
                    return;
                  }

                  return (
                    <View key={index} style={{ marginBottom: 20 }}>
                      {/* Render heading if available */}
                      {heading && (
                        <Text style={styles.headingText}>{heading}</Text>
                      )}

                      {/* Render body text */}
                      {body && <Text style={styles.bodyText}>{body}</Text>}
                    </View>
                  );
                })}

                {/* Unreframed Data Container */}
                <View
                  style={{
                    flexDirection: showUnreframedData
                      ? 'column-reverse'
                      : 'column',
                  }}
                >
                  <Pressable
                    style={{ alignSelf: 'center', alignItems: 'center' }}
                    onPress={() => setShowUnreframedData(!showUnreframedData)}
                  >
                    <Text style={styles.showOldSituationText}>
                      {showUnreframedData
                        ? 'Oude situatie verbergen'
                        : 'Oude situatie bekijken'}
                    </Text>

                    <Feather
                      name={showUnreframedData ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={'gray'}
                    />
                  </Pressable>

                  {showUnreframedData &&
                    unreframedData.map((data, index) => {
                      const { heading, body } = data;

                      if (!heading && !body) {
                        return;
                      }

                      return (
                        <View key={index} style={{ marginBottom: 20 }}>
                          <Text style={[styles.headingText, { color: 'gray' }]}>
                            {heading}
                          </Text>
                          <Text style={[styles.bodyText, { color: 'gray' }]}>
                            {body}
                          </Text>
                        </View>
                      );
                    })}
                </View>
              </>
            )}

            {/* Buttons Container */}
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                columnGap: 10,
              }}
            >
              <Pressable onPress={() => handleEdit()}>
                <Image
                  resizeMode='contain'
                  style={{ width: 46, height: 46 }}
                  source={require('../../assets/images/edit_icon.png')}
                />
              </Pressable>

              <Pressable onPress={() => handleDelete()}>
                <Image
                  resizeMode='contain'
                  style={{ width: 43, height: 46 }}
                  source={require('../../assets/images/delete_icon.png')}
                />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderRadius: 15,
    height: '90%',
    width: windowWidth,
    backgroundColor: '#E5F1E3',
    display: 'flex',
    flexDirection: 'column',
  },
  headersContainer: {
    width: '100%',
    paddingRight: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 18,
    flexShrink: 1,
  } as TextStyle,
  mainContainer: {
    flexGrow: 0,
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    backgroundColor: '#ffffff',
    padding: 25,
  },
  headingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    marginBottom: 5,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  optionsText: {
    ...Fonts.sofiaProMediumItalic[Platform.OS],
    fontSize: 12,
    fontStyle: 'italic',
    flexShrink: 1, // text wrap
  } as TextStyle,
  showOldSituationText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 11,
    color: 'gray',
  } as TextStyle,
});
