import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
  TextStyle,
  Platform,
} from 'react-native';

import Slider from '@react-native-community/slider';
import { MarkerProps } from '@react-native-community/slider';

import { Fonts } from '../styles';
import { Category, IIcon } from '../types';

import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// @TODO: DRY (DO NOT REPEAT YOURSELF)!

const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={24} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={24} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={24} color='black' />;
  }
};

interface ReframingSuccessModalProps {
  // @TODO: Correct the `route` type annotation!
  route: any;
  reframingModalIndex?: number;
  setReframingModalIndex: React.Dispatch<React.SetStateAction<number>>;
  modalReframingSuccessVisible: boolean;
  setModalReframingSuccessVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalWorryListVisible?: boolean;
  setModalWorryListVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReframingSuccessModal: React.FC<ReframingSuccessModalProps> = ({
  route,
  setReframingModalIndex,
  modalReframingSuccessVisible,
  setModalReframingSuccessVisible,
  modalWorryListVisible,
  setModalWorryListVisible,
  modalReframingVisible,
  setModalReframingVisible,
}) => {
  const {
    uuid,
    category,
    title,
    description,
    resetWorryEntryFields,
    createWorryEntry,
  } = useContext(WorryContext);

  const {
    isChecked,
    alternativePerspective,
    friendAdvice,
    againstThoughtEvidence,
    thoughtLikelihood,
    feelingDescription,
    thoughtLikelihoodSliderOne,
    thoughtLikelihoodSliderTwo,
    setThoughtLikelihoodSliderOne,
    setThoughtLikelihoodSliderTwo,
    createNoteEntry,
    resetNoteEntryFields,
  } = useContext(NoteContext);

  const [showOldSituation, setShowOldSituation] = useState<boolean>(false);

  const handleClose = () => {
    setReframingModalIndex(0);
    setShowOldSituation(false);
    resetWorryEntryFields();
    resetNoteEntryFields();
    setModalReframingSuccessVisible(!modalReframingSuccessVisible);

    if (route.name == 'WorryBox' && setModalWorryListVisible !== undefined) {
      setModalWorryListVisible(!modalWorryListVisible);
    }
  };

  const handleAdjust = () => {
    setModalReframingSuccessVisible(!modalReframingSuccessVisible);
    setModalReframingVisible(!modalReframingVisible);
  };

  const handleFinish = () => {
    setReframingModalIndex(0);
    setShowOldSituation(false);
    setModalReframingSuccessVisible(!modalReframingSuccessVisible);

    if (route.name == 'WorryBox' && setModalWorryListVisible !== undefined) {
      setModalWorryListVisible(!modalWorryListVisible);
    }

    if (isChecked) {
      createWorryEntry();
      createNoteEntry(uuid);
    } else {
      createNoteEntry();
    }

    resetWorryEntryFields();
    resetNoteEntryFields();
  };

  const StepMarker: React.FC<MarkerProps> = ({ stepMarked }) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 6,
          borderRadius: 99,
          width: 8,
          height: 8,
          backgroundColor: stepMarked ? '#A5B79F' : '#5C6B57',
        }}
      ></View>
    );
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalReframingSuccessVisible}
      onRequestClose={() =>
        setModalReframingSuccessVisible(!modalReframingSuccessVisible)
      }
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          {/* Icon + Title + Close Button */}
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 15,
                width: 200,
              }}
            >
              <Image
                style={{ width: '100%', height: 50 }}
                resizeMode='contain'
                source={require('../../assets/images/reframing_gelukt_icon.png')}
              />
              <Text style={styles.modalTitleText}>Gelukt!</Text>
            </View>
            {/* X Close Button */}
            <Pressable
              style={{ position: 'absolute', right: 0, top: 0 }}
              onPress={() => handleClose()}
            >
              <Feather name='x-circle' size={24} color='black' />
            </Pressable>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>
            Hier is je nieuwe Note-to-Self:
          </Text>

          {/* // @TODO: Create a `NoteListItemExpanded` component and move this logic in there! */}
          {/* Note Item Component */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainContainer}
            contentContainerStyle={styles.mainContentContainer}
          >
            {/* Icon + Title */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 10,
              }}
            >
              {getCategory(category)}
              <Text
                style={
                  {
                    ...Fonts.poppinsSemiBold[Platform.OS],
                    fontSize: 16,
                  } as TextStyle
                }
              >
                {title}
              </Text>
            </View>

            {/* Main Content */}
            <View
              style={{
                marginTop: 10,
                width: '100%',
                rowGap: 10,
              }}
            >
              {/* Alternative Perspective Text */}
              <Text style={styles.bodyText}>{alternativePerspective}</Text>

              {/* Friend Advice Text */}
              <View>
                <Text style={styles.headingText}>Advies:</Text>
                <Text style={styles.bodyText}>{friendAdvice}</Text>
              </View>

              {/* Against Thought Evidence Text */}
              <View>
                <Text style={styles.headingText}>Tegenbewijs:</Text>
                <Text style={styles.bodyText}>{againstThoughtEvidence}</Text>
              </View>

              {/* Likelihood Text */}
              <View>
                <Text style={styles.headingText}>Waarschijnlijkheid:</Text>
                <Text style={styles.bodyText}>{thoughtLikelihood}</Text>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  disabled={true}
                  minimumValue={0}
                  maximumValue={4}
                  step={1}
                  thumbTintColor='#A5B79F'
                  StepMarker={StepMarker}
                  value={thoughtLikelihoodSliderTwo}
                  onValueChange={(value) =>
                    setThoughtLikelihoodSliderTwo(value)
                  }
                  minimumTrackTintColor='#5C6B57'
                  maximumTrackTintColor='#5C6B57'
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.optionsText}>Heel klein</Text>
                  <Text style={styles.optionsText}>Heel groot</Text>
                </View>
              </View>

              {/* View Old Situation */}
              {!showOldSituation && (
                <Pressable
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 125,
                    alignSelf: 'center',
                  }}
                  onPress={() => setShowOldSituation(!showOldSituation)}
                >
                  <Text
                    style={
                      {
                        textAlign: 'center',
                        ...Fonts.poppinsRegular[Platform.OS],
                        fontSize: 11,
                        color: 'gray',
                      } as TextStyle
                    }
                  >
                    Oude situatie bekijken
                  </Text>
                  <FontAwesome6 name='chevron-down' size={10} color='gray' />
                </Pressable>
              )}

              {showOldSituation && (
                <>
                  {/* Situation Description */}
                  <View>
                    <Text style={[styles.headingText, { color: 'gray' }]}>
                      Situatieomschrijving:
                    </Text>
                    <Text style={[styles.bodyText, { color: 'gray' }]}>
                      {description}
                    </Text>
                  </View>

                  {/* Feeling Description */}
                  <View>
                    <Text style={[styles.headingText, { color: 'gray' }]}>
                      Gevoelsomschrijving:
                    </Text>
                    <Text style={[styles.bodyText, { color: 'gray' }]}>
                      {feelingDescription}
                    </Text>
                    <Slider
                      style={{ width: '100%', height: 40 }}
                      disabled={true}
                      minimumValue={0}
                      maximumValue={4}
                      step={1}
                      thumbTintColor='#A5B79F'
                      StepMarker={StepMarker}
                      value={thoughtLikelihoodSliderOne}
                      onValueChange={(value) =>
                        setThoughtLikelihoodSliderOne(value)
                      }
                      minimumTrackTintColor='#5C6B57'
                      maximumTrackTintColor='#5C6B57'
                    />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={styles.optionsText}>Heel klein</Text>
                      <Text style={styles.optionsText}>Heel groot</Text>
                    </View>
                  </View>

                  <Pressable
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      alignSelf: 'center',
                    }}
                    onPress={() => setShowOldSituation(!showOldSituation)}
                  >
                    <FontAwesome6 name='chevron-up' size={10} color='gray' />
                    <Text
                      style={
                        {
                          textAlign: 'center',
                          ...Fonts.poppinsRegular[Platform.OS],
                          fontSize: 11,
                          color: 'gray',
                        } as TextStyle
                      }
                    >
                      Inklappen
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </ScrollView>

          {/* Buttons */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              columnGap: 15,
            }}
          >
            {/* Adjust Button */}
            <Pressable
              style={styles.adjustButton}
              onPress={() => handleAdjust()}
            >
              <Text style={styles.adjustButtonText}>Aanpassen</Text>
            </Pressable>
            {/* Finish Button */}
            <Pressable
              style={styles.finishButton}
              onPress={() => handleFinish()}
            >
              <Text style={styles.finishButtonText}>Klaar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderWidth: 2,
    borderRadius: 30,
    height: windowHeight <= 667 ? '90%' : '85%',
    width: windowWidth - 2 * 10,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitleText: {
    textAlign: 'center',
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  descriptionText: {
    textAlign: 'center',
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  adjustButton: {
    backgroundColor: '#dedede',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  adjustButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  finishButton: {
    backgroundColor: '#A9C1A1',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  finishButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  headingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  mainContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  optionsText: {
    ...Fonts.poppinsMediumItalic[Platform.OS],
    fontSize: 12,
    fontStyle: 'italic',
    flexShrink: 1, // text wrap
  } as TextStyle,
});
