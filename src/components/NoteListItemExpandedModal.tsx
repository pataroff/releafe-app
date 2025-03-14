import React, { useState, useContext } from 'react';

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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

import { Category, INoteEntry } from '../types';

import { NoteContext } from '../context/NoteContext';
import { WorryContext } from '../context/WorryContext';

import { Video, ResizeMode } from 'expo-av';
import { MemoItem } from './MemoItem';

const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={30} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={30} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={30} color='black' />;
  }
};

const windowWidth = Dimensions.get('window').width;

interface NoteListItemExpandedModalProps {
  modalNoteListItemExpandedVisible: boolean;
  setModalNoteListItemExpandedVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: INoteEntry;
}

export const NoteListItemExpandedModal: React.FC<
  NoteListItemExpandedModalProps
> = ({
  modalNoteListItemExpandedVisible,
  setModalNoteListItemExpandedVisible,
  modalReframingVisible,
  setModalReframingVisible,
  item,
}) => {
  const [showUnreframedData, setShowUnreframedData] = useState<boolean>(false);
  const { updateNoteEntryFields, deleteNoteEntry } = useContext(NoteContext);
  const { updateWorryEntryFields } = useContext(WorryContext);

  const {
    id,
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
  } = item;

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

  const handleReframing = async () => {
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
    setModalReframingVisible(!modalReframingVisible);
  };

  const handleDelete = () => {
    deleteNoteEntry(uuid);
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
            {mediaFile ? (
              <>
                <Text style={styles.bodyText}>{description}</Text>
                {
                  // @ts-expect-error Property 'endsWith' does not exist on type 'MediaFile'.
                  mediaFile.endsWith('.jpg') || mediaFile.endsWith('.pdf') ? (
                    <Image
                      style={{ width: '100%', height: 400, marginVertical: 20 }}
                      source={{
                        // PB_URL ends with a slash, therefore no slash before 'api'!
                        uri: `${process.env.PB_URL}api/files/note_entries/${id}/${mediaFile}`,
                      }}
                    />
                  ) : // @ts-expect-error Property 'endsWith' does not exist on type 'MediaFile'.
                  mediaFile.startsWith('recording') ? (
                    <View style={{ marginVertical: 20 }}>
                      <MemoItem
                        uri={`${process.env.PB_URL}api/files/note_entries/${id}/${mediaFile}`}
                        metering={audioMetering}
                      />
                    </View>
                  ) : (
                    <>
                      <Video
                        source={{
                          // PB_URL ends with a slash, therefore no slash before 'api'!
                          uri: `${process.env.PB_URL}api/files/note_entries/${id}/${mediaFile}`,
                        }}
                        style={{
                          width: '100%',
                          height: 400,
                          marginVertical: 20,
                        }}
                        resizeMode={ResizeMode.COVER}
                        useNativeControls
                        isLooping
                      />
                    </>
                  )
                }
              </>
            ) : (
              <>
                {/* Reframed Data Container */}
                <View style={{ rowGap: 20 }}>
                  {reframedData.map((data, index) => (
                    <View key={index}>
                      {/* Render heading if available */}
                      {data.heading && (
                        <Text style={styles.headingText}>{data.heading}</Text>
                      )}

                      {/* Render body text */}
                      <Text style={styles.bodyText}>{data.body}</Text>
                    </View>
                  ))}
                </View>

                {/* Unreframed Data Container */}
                <View
                  style={{
                    marginVertical: 20,
                    display: 'flex',
                    flexDirection: showUnreframedData
                      ? 'column-reverse'
                      : 'column',
                    rowGap: 20,
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
                    unreframedData.map((data, index) => (
                      <View key={index}>
                        <Text style={[styles.headingText, { color: 'gray' }]}>
                          {data.heading}
                        </Text>
                        <Text style={[styles.bodyText, { color: 'gray' }]}>
                          {data.body}
                        </Text>
                      </View>
                    ))}
                </View>
              </>
            )}

            {/* Buttons Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
              }}
            >
              {feelingDescription !== '' && (
                <Pressable onPress={() => handleReframing()}>
                  <Image
                    style={{ width: 190, height: 47 }}
                    source={require('../../assets/images/reframe_again_button.png')}
                  />
                </Pressable>
              )}

              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => handleDelete()}
              >
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
  } as TextStyle,
  mainContainer: {
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 125,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    backgroundColor: '#ffffff',
    padding: 25,
  },
  headingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
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
