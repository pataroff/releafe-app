import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
  TextStyle,
  Platform,
} from 'react-native';

import Checkbox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import { MarkerProps } from '@react-native-community/slider';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { DropdownComponent } from './DropdownComponent';
import { CustomProgressBar } from './CustomProgressBar';

import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type StringStateSetterPair = {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

type NumberStateSetterPair = {
  value: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
};

interface ReframingModalProps {
  // @TODO Correct the `route` type annotation!
  route: any;
  reframingModalIndex: number;
  setReframingModalIndex: React.Dispatch<React.SetStateAction<number>>;
  reframingSteps: {
    title: string;
    description?: string;
    question?: string;
    placeholder?: string;
    instruction?: string;
  }[];
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalWorryListVisible?: boolean;
  setModalWorryListVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  modalReframingSuccessVisible: boolean;
  setModalReframingSuccessVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const ReframingModal: React.FC<ReframingModalProps> = ({
  route,
  reframingModalIndex,
  setReframingModalIndex,
  reframingSteps,
  modalReframingVisible,
  setModalReframingVisible,
  modalWorryListVisible,
  setModalWorryListVisible,
  modalReframingSuccessVisible,
  setModalReframingSuccessVisible,
}) => {
  const {
    category,
    title,
    description,
    setCategory,
    setTitle,
    setDescription,
    setReframed,
    resetWorryEntryFields,
  } = useContext(WorryContext);
  const {
    isChecked,
    feelingDescription,
    thoughtLikelihoodSliderOne,
    forThoughtEvidence,
    againstThoughtEvidence,
    friendAdvice,
    thoughtLikelihoodSliderTwo,
    thoughtLikelihood,
    alternativePerspective,
    setIsChecked,
    setThoughtLikelihoodSliderOne,
    setFeelingDescription,
    setForThoughtEvidence,
    setAgainstThoughtEvidence,
    setFriendAdvice,
    setThoughtLikelihoodSliderTwo,
    setThoughtLikelihood,
    setAlternativePerspective,
    resetNoteEntryFields,
  } = useContext(NoteContext);

  // @TODO Is there a better way of doing this?
  const reframingModalTextState = new Map<number, StringStateSetterPair>([
    [1, { value: feelingDescription, setter: setFeelingDescription }],
    [2, { value: forThoughtEvidence, setter: setForThoughtEvidence }],
    [3, { value: againstThoughtEvidence, setter: setAgainstThoughtEvidence }],
    [4, { value: friendAdvice, setter: setFriendAdvice }],
    // Skipping `reframingModalIndex` 5 as there is no state corressponding to it!
    [6, { value: thoughtLikelihood, setter: setThoughtLikelihood }],
    [7, { value: alternativePerspective, setter: setAlternativePerspective }],
  ]);
  const reframingModalSliderState = new Map<number, NumberStateSetterPair>([
    [
      1,
      {
        value: thoughtLikelihoodSliderOne,
        setter: setThoughtLikelihoodSliderOne,
      },
    ],
    [
      2,
      {
        value: thoughtLikelihoodSliderTwo,
        setter: setThoughtLikelihoodSliderTwo,
      },
    ],
  ]);

  const handleClose = () => {
    setReframingModalIndex(0);
    resetWorryEntryFields();
    resetNoteEntryFields();
    setModalReframingVisible(!modalReframingVisible);
    if (route.name == 'WorryBox' && setModalWorryListVisible !== undefined) {
      setModalWorryListVisible(!modalWorryListVisible);
    }
  };

  const handlePrevious = () => {
    if (reframingModalIndex > 0) {
      setReframingModalIndex(reframingModalIndex - 1);
    } else {
      handleClose();
    }
  };

  const handleNext = () => {
    if (reframingModalIndex < reframingSteps.length - 1) {
      setReframingModalIndex(reframingModalIndex + 1);
    } else {
      setReframed(true);
      setModalReframingVisible(!modalReframingVisible);
      setModalReframingSuccessVisible(!modalReframingSuccessVisible);
    }
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
      visible={modalReframingVisible}
      onRequestClose={() => handleClose()}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          {/* Title + Close Button */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.modalTitleText}>
              {reframingSteps[reframingModalIndex].title}
            </Text>
            <Pressable
              style={{ position: 'absolute', right: 0 }}
              onPress={() => handleClose()}
            >
              <Feather name='x-circle' size={24} color='black' />
            </Pressable>
          </View>

          {/* Question */}
          {reframingModalIndex !== 5 &&
            reframingModalIndex > 1 &&
            reframingModalIndex <= reframingSteps.length - 1 && (
              <Text
                style={
                  {
                    marginTop: 10,
                    textAlign: 'center',
                    ...Fonts.poppinsSemiBold[Platform.OS],
                    fontSize: 12,
                  } as TextStyle
                }
              >
                {reframingSteps[reframingModalIndex].question}
              </Text>
            )}

          {/* Description */}
          {reframingModalIndex !== 5 && (
            <Text
              style={
                {
                  ...Fonts.poppinsRegular[Platform.OS],
                  fontSize: 13,
                  textAlign: 'center',
                  marginTop: 10,
                } as TextStyle
              }
            >
              {reframingSteps[reframingModalIndex].description}
            </Text>
          )}

          {/* Main Content Wrapper */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {reframingModalIndex == 5 && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  rowGap: 20,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={
                    {
                      textAlign: 'center',
                      ...Fonts.poppinsSemiBold[Platform.OS],
                    } as TextStyle
                  }
                >
                  Lees dit nog eens goed:
                </Text>
                <Text
                  style={
                    {
                      textAlign: 'center',
                      ...Fonts.poppinsRegular[Platform.OS],
                      fontSize: 18,
                    } as TextStyle
                  }
                >{`"${friendAdvice}"`}</Text>
              </View>
            )}
            {reframingModalIndex == 0 && (
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 10,
                  marginTop: 20,
                }}
              >
                {/* Dropdown + Title */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <DropdownComponent
                    category={category}
                    setCategory={setCategory}
                  />
                  <TextInput
                    style={
                      {
                        ...Fonts.poppinsItalic[Platform.OS],
                        fontStyle: 'italic',
                        borderWidth: 1,
                        borderColor: '#dedede',
                        borderRadius: 5,
                        height: 30,
                        width: '67%',
                        paddingLeft: 5,
                      } as TextStyle
                    }
                    placeholder='Titel'
                    placeholderTextColor='#dedede'
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                  />
                </View>
                {/* Description */}
                <TextInput
                  style={
                    {
                      ...Fonts.poppinsItalic[Platform.OS],
                      fontStyle: 'italic',
                      position: 'relative',
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#dedede',
                      flexGrow: 1,
                    } as TextStyle
                  }
                  placeholder='Omschrijving'
                  placeholderTextColor='#dedede'
                  multiline
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                />

                {reframingModalIndex == 0 && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      columnGap: 10,
                      marginTop: 10,
                    }}
                  >
                    <Checkbox
                      color='black'
                      value={isChecked}
                      onValueChange={setIsChecked}
                    />
                    <Text style={{ ...Fonts.poppinsRegular } as TextStyle}>
                      Koppelen aan zorg
                    </Text>
                  </View>
                )}
              </View>
            )}
            {reframingModalIndex > 0 && reframingModalIndex !== 5 && (
              <View
                style={
                  reframingModalIndex === 6
                    ? { flexGrow: 1, flexDirection: 'column-reverse' }
                    : { flexGrow: 1 }
                }
              >
                {/* Dynamic TextInput Component */}
                <TextInput
                  style={
                    {
                      ...Fonts.poppinsItalic[Platform.OS],
                      fontStyle: 'italic',
                      position: 'relative',
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#dedede',
                      flexGrow: 1,
                      marginTop: reframingModalIndex === 6 ? 10 : 20,
                    } as TextStyle
                  }
                  placeholder={reframingSteps[reframingModalIndex].placeholder}
                  placeholderTextColor='#dedede'
                  multiline
                  value={
                    reframingModalTextState.get(reframingModalIndex)?.value
                  }
                  onChangeText={(value) =>
                    reframingModalTextState
                      .get(reframingModalIndex)
                      ?.setter(value)
                  }
                />
                {reframingModalIndex === 6 && (
                  <Text
                    style={
                      {
                        textAlign: 'center',
                        ...Fonts.poppinsSemiBold[Platform.OS],
                      } as TextStyle
                    }
                  >
                    Waarom?
                  </Text>
                )}
                {/* Dynamic Slider Component  */}
                {(reframingModalIndex == 1 || reframingModalIndex == 6) && (
                  <View
                    style={{
                      marginTop: 20,
                      rowGap: 15,
                    }}
                  >
                    {reframingModalIndex === 1 && (
                      <Text
                        style={
                          {
                            textAlign: 'center',
                            alignSelf: 'center',
                            ...Fonts.poppinsRegular[Platform.OS],
                          } as TextStyle
                        }
                      >
                        Hoe groot denk je dat de kans is dat deze gedachte
                        realiteit wordt?
                      </Text>
                    )}
                    <View>
                      <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={4}
                        step={1}
                        thumbTintColor='#A5B79F'
                        StepMarker={StepMarker}
                        value={
                          reframingModalIndex === 1
                            ? reframingModalSliderState.get(1)?.value
                            : reframingModalSliderState.get(2)?.value
                        }
                        onValueChange={(value) =>
                          reframingModalIndex === 1
                            ? reframingModalSliderState.get(1)?.setter(value)
                            : reframingModalSliderState.get(2)?.setter(value)
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
                  </View>
                )}
              </View>
            )}

            {reframingModalIndex !== 5 && (
              <View
                style={{
                  height: 125,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
                <Text
                  style={
                    {
                      textAlign: 'center',
                      color: 'gray',
                      ...Fonts.poppinsRegular[Platform.OS],
                      fontSize: 13,
                    } as TextStyle
                  }
                >
                  {reframingSteps[reframingModalIndex].instruction}
                </Text>
              </View>
            )}

            {/* Buttons */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Pressable
                style={styles.backButton}
                onPress={() => handlePrevious()}
              >
                <Text style={styles.backButtonText}>
                  {reframingModalIndex == 0 ? 'Afsluiten' : 'Terug'}
                </Text>
              </Pressable>
              <CustomProgressBar
                progress={reframingModalIndex}
                totalSteps={10}
              />
              <Pressable
                style={styles.continueButton}
                onPress={() => handleNext()}
              >
                <Text style={styles.continueButtonText}>Verder</Text>
              </Pressable>
            </View>
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
  },
  modalTitleText: {
    textAlign: 'center',
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  backButton: {
    borderRadius: 30,
    alignItems: 'center',
    width: 90,
    paddingVertical: 10,
    backgroundColor: '#dedede',
  },
  backButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  continueButton: {
    borderRadius: 30,
    alignItems: 'center',
    width: 90,
    paddingVertical: 10,
    backgroundColor: '#A9C1A1',
  },
  continueButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
  optionsText: {
    ...Fonts.poppinsMediumItalic[Platform.OS],
    fontSize: 12,
    fontStyle: 'italic',
    flexShrink: 1, // text wrap
  } as TextStyle,
});
