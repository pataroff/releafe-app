import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
  TextStyle,
  Platform,
} from 'react-native';

import Checkbox from 'expo-checkbox';
import { Slider } from '@rneui/themed';
import { MarkerProps } from '@react-native-community/slider';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { DropdownComponent } from './DropdownComponent';
import { CloseModal } from './CloseModal';

import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';
import { AuthContext } from '../context/AuthContext';

import { Priority } from '../types';
import { getCategory, getPriorityColor, reframingSteps } from '../utils/worry';

const windowWidth = Dimensions.get('window').width;

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
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalWorryListVisible?: boolean;
  setModalWorryListVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen?: boolean;
}

export const ReframingModal: React.FC<ReframingModalProps> = ({
  route,
  reframingModalIndex,
  setReframingModalIndex,
  modalReframingVisible,
  setModalReframingVisible,
  modalWorryListVisible,
  setModalWorryListVisible,
  isDrawerOpen,
}) => {
  const {
    uuid,
    category,
    priority,
    title,
    description,
    setCategory,
    setPriority,
    setTitle,
    setDescription,
    setReframed,
    resetWorryEntryFields,
  } = useContext(WorryContext);
  const {
    feelingDescription,
    thoughtLikelihoodSliderOne,
    forThoughtEvidence,
    againstThoughtEvidence,
    friendAdvice,
    thoughtLikelihoodSliderTwo,
    thoughtLikelihood,
    alternativePerspective,
    setThoughtLikelihoodSliderOne,
    setFeelingDescription,
    setForThoughtEvidence,
    setAgainstThoughtEvidence,
    setFriendAdvice,
    setThoughtLikelihoodSliderTwo,
    setThoughtLikelihood,
    setAlternativePerspective,
    createNoteEntry,
    resetNoteEntryFields,
  } = useContext(NoteContext);

  const { user } = useContext(AuthContext);

  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);
  const [showPriorityButtons, setShowPriorityButtons] =
    useState<boolean>(false);

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

  const successData = [
    { heading: null, body: alternativePerspective },
    { heading: 'Advies', body: friendAdvice },
    { heading: 'Tegenbewijs', body: againstThoughtEvidence },
    { heading: 'Waarschijnlijkheid', body: thoughtLikelihood },
  ];

  const handleClose = () => {
    setReframingModalIndex(0);
    resetWorryEntryFields();
    resetNoteEntryFields();
    setModalReframingVisible(!modalReframingVisible);
    if (
      setModalWorryListVisible !== undefined &&
      route.name == 'WorryBox' &&
      isDrawerOpen
    ) {
      // This fixes the app freezing!
      setTimeout(() => {
        setModalWorryListVisible(!modalWorryListVisible);
      }, 300);
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
      setReframed(true); // @TODO This is part of the worry and it is not being updated in the database here, so why are we doing this?
      setReframingModalIndex(0);
      setModalReframingVisible(!modalReframingVisible);

      if (route.name === 'WorryBox') {
        createNoteEntry(uuid);
      } else {
        createNoteEntry();
      }

      resetNoteEntryFields();
      resetWorryEntryFields();
    }
  };

  const handlePriority = (priority: Priority) => {
    setPriority(priority);
    setShowPriorityButtons(!showPriorityButtons);
  };

  // const StepMarker: React.FC<MarkerProps> = ({ stepMarked }) => {
  //   return (
  //     <View
  //       style={{
  //         position: 'absolute',
  //         top: 6,
  //         borderRadius: 99,
  //         width: 8,
  //         height: 8,
  //         backgroundColor: stepMarked ? '#A5B79F' : '#5C6B57',
  //       }}
  //     ></View>
  //   );
  // };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalReframingVisible}
      onRequestClose={() => setCloseModalVisible(!closeModalVisible)}
    >
      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        parentModalVisible={modalReframingVisible}
        setParentModalVisible={setModalReframingVisible}
        title='Stoppen met reframen'
        description='Je staat op het punt te stoppen met het reframing-proces. Weet je het zeker?'
        handleClose={handleClose}
      />
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.headersContainer}>
            {/* Title + Close Button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headersTitleText}>Reframing</Text>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => setCloseModalVisible(!closeModalVisible)}
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>

            {reframingModalIndex !== reframingSteps.length - 1 && (
              <View style={{ marginTop: 15, rowGap: 10 }}>
                {/* Heading + Edit Description (WorryBox) */}
                <View>
                  {/* Heading */}
                  <Text style={styles.headersHeadingText}>
                    {reframingSteps[reframingModalIndex].heading}
                  </Text>

                  {/* Edit Description (WorryBox) */}
                  {reframingModalIndex == 0 && route.name === 'WorryBox' && (
                    <Text style={styles.headersDescriptionText}>
                      De situatie is automatisch overgenomen uit je zorg. Je
                      kunt deze hier indien nodig aanpassen.
                    </Text>
                  )}
                </View>

                {/* Description */}
                <Text style={styles.headersDescriptionText}>
                  {reframingSteps[reframingModalIndex].description}
                </Text>
              </View>
            )}

            {/* Worry List Item Preview */}
            {reframingModalIndex >= 1 && (
              <View style={[styles.worryListItemContainer, { height: 60 }]}>
                {/* Priority Bar */}
                <View
                  style={{
                    position: 'absolute',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: getPriorityColor(priority),
                    width: 65,
                    height: '100%',
                  }}
                ></View>

                {/* Main Content Wrapper */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* Category + Title */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                      columnGap: 15,
                    }}
                  >
                    {/* Category Container */}
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#EDF8E9',
                        height: '100%',
                        width: 65,
                        borderRadius: 10,
                      }}
                    >
                      {getCategory(category)}
                    </View>

                    {/* Title */}
                    <Text style={styles.worryListItemTitleText}>{title}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Main Content Wrapper */}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.mainContainer}
            contentContainerStyle={styles.mainContentContainerStyles}
          >
            {/* Main Content Container */}
            <View style={{ flex: 1, marginBottom: 190 }}>
              {reframingModalIndex == 5 && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 20,
                    width: windowWidth - 2 * 20,
                    padding: 25,
                    backgroundColor: 'white',
                    borderRadius: 30,
                    rowGap: 10,
                  }}
                >
                  <Text
                    style={
                      {
                        ...Fonts.sofiaProSemiBold[Platform.OS],
                      } as TextStyle
                    }
                  >
                    Lees dit nog eens goed door:
                  </Text>
                  <Text
                    style={
                      {
                        ...Fonts.sofiaProRegular[Platform.OS],
                        fontSize: 13,
                      } as TextStyle
                    }
                  >{`"${friendAdvice.trim()}"`}</Text>
                </View>
              )}

              {reframingModalIndex == 0 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                      marginHorizontal: 20,
                      borderRadius: 30,
                      padding: 20,
                      backgroundColor: 'white',
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
                            ...Fonts.sofiaProRegular[Platform.OS],
                            backgroundColor: '#f6f7f8',
                            borderRadius: 10,
                            height: 40,
                            width: '67%',
                            paddingLeft: 10,
                          } as TextStyle
                        }
                        placeholder='Titel van zorg...'
                        placeholderTextColor='#00000080'
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                      />
                    </View>
                  </View>

                  <View style={styles.textInputContainer}>
                    <View
                      style={{
                        position: 'relative',
                      }}
                    >
                      <TextInput
                        style={
                          {
                            ...Fonts.sofiaProRegular[Platform.OS],
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: '#f6f7f8',
                            height: 180,
                          } as TextStyle
                        }
                        placeholder={
                          reframingSteps[reframingModalIndex].placeholder
                        }
                        placeholderTextColor='#00000080'
                        multiline
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                      />

                      {/* Priority Button(s)*/}
                      {showPriorityButtons ? (
                        <>
                          {/* TODO: Is there a better way of doing this? */}
                          <Pressable
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 0,
                              borderRadius: 99,
                              backgroundColor: '#dedede',
                              padding: 5,
                            }}
                            onPress={() => handlePriority(Priority.None)}
                          >
                            <Feather name='flag' size={18} color='gray' />
                          </Pressable>

                          <Pressable
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 35,
                              borderRadius: 99,
                              backgroundColor: '#dedede',
                              padding: 5,
                            }}
                            onPress={() => handlePriority(Priority.Low)}
                          >
                            <Feather
                              name='flag'
                              size={18}
                              color={getPriorityColor(Priority.Low)}
                            />
                          </Pressable>

                          <Pressable
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 70,
                              borderRadius: 99,
                              backgroundColor: '#dedede',
                              padding: 5,
                            }}
                            onPress={() => handlePriority(Priority.Medium)}
                          >
                            <Feather
                              name='flag'
                              size={18}
                              color={getPriorityColor(Priority.Medium)}
                            />
                          </Pressable>

                          <Pressable
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 105,
                              borderRadius: 99,
                              backgroundColor: '#dedede',
                              padding: 5,
                            }}
                            onPress={() => handlePriority(Priority.High)}
                          >
                            <Feather
                              name='flag'
                              size={18}
                              color={getPriorityColor(Priority.High)}
                            />
                          </Pressable>
                        </>
                      ) : (
                        <Pressable
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            padding: 5,
                          }}
                          onPress={() =>
                            setShowPriorityButtons(!showPriorityButtons)
                          }
                        >
                          <Feather
                            name='flag'
                            size={18}
                            color={getPriorityColor(priority)}
                          />
                        </Pressable>
                      )}
                    </View>

                    {/* Checkbox Functionality */}
                    {/* {reframingModalIndex == 0 && route.name === 'WorryBox' && (
                      <View style={{ rowGap: 15 }}>
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
                            color={isChecked ? '#C1DEBE' : '#5C6B57'}
                            value={isChecked}
                            onValueChange={setIsChecked}
                          />
                          <Text
                            style={
                              {
                                ...Fonts.sofiaProMedium[Platform.OS],
                              } as TextStyle
                            }
                          >
                            Koppelen aan zorg
                          </Text>
                        </View>

                        <Text
                          style={
                            {
                              ...Fonts.sofiaProLight[Platform.OS],
                              fontSize: 11,
                              textAlign: 'center',
                            } as TextStyle
                          }
                        >
                          Wanneer je het reframing-proces koppelt aan de zorg,
                          wordt deze zorg na afloop omgezet in een bericht aan
                          jezelf en automatisch uit het zorgenbakje verwijderd.
                        </Text>
                      </View>
                    )} */}
                  </View>
                </>
              )}

              {reframingModalIndex > 0 &&
                reframingModalIndex !== 5 &&
                reframingModalIndex <= 7 && (
                  <View style={styles.textInputContainer}>
                    {/* Question */}
                    {reframingModalIndex !== 1 && (
                      <View style={{ rowGap: 10 }}>
                        <Text
                          style={
                            {
                              ...Fonts.sofiaProSemiBold[Platform.OS],
                            } as TextStyle
                          }
                        >
                          {reframingSteps[reframingModalIndex].question}
                        </Text>

                        <Text
                          style={
                            {
                              ...Fonts.sofiaProRegular[Platform.OS],
                              fontSize: 13,
                            } as TextStyle
                          }
                        >
                          {reframingSteps[reframingModalIndex].instruction}
                        </Text>
                      </View>
                    )}

                    {/* Dynamic TextInput + Dynamic Slider Wrapper */}
                    <View
                      style={
                        reframingModalIndex === 6
                          ? { flexDirection: 'column-reverse' }
                          : {}
                      }
                    >
                      {/* Dynamic TextInput Component */}
                      <TextInput
                        style={[
                          reframingModalIndex > 1 && reframingModalIndex <= 7
                            ? { marginTop: 10 }
                            : {},
                          styles.dynamicTextInputComponent,
                        ]}
                        placeholder={
                          reframingSteps[reframingModalIndex].placeholder
                        }
                        placeholderTextColor='#dedede'
                        multiline
                        value={
                          reframingModalTextState.get(reframingModalIndex)
                            ?.value
                        }
                        onChangeText={(value) =>
                          reframingModalTextState
                            .get(reframingModalIndex)
                            ?.setter(value.trim())
                        }
                      />
                      {/* Dynamic Slider Component  */}
                      {(reframingModalIndex == 1 ||
                        reframingModalIndex == 6) && (
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
                                  ...Fonts.sofiaProRegular[Platform.OS],
                                } as TextStyle
                              }
                            >
                              Hoe groot denk je dat de kans is dat deze gedachte
                              realiteit wordt?
                            </Text>
                          )}
                          <View>
                            <Slider
                              style={{ width: '100%' }}
                              trackStyle={{ height: 15, borderRadius: 30 }}
                              thumbStyle={{
                                width: 28,
                                height: 28,
                              }}
                              thumbTintColor='#C1DEBE'
                              minimumValue={0}
                              maximumValue={10}
                              value={
                                reframingModalIndex === 1
                                  ? reframingModalSliderState.get(1)?.value
                                  : reframingModalSliderState.get(2)?.value
                              }
                              onValueChange={(value) =>
                                reframingModalIndex === 1
                                  ? reframingModalSliderState
                                      .get(1)
                                      ?.setter(Math.round(value))
                                  : reframingModalSliderState
                                      .get(2)
                                      ?.setter(Math.round(value))
                              }
                              minimumTrackTintColor='#E4E1E1'
                              maximumTrackTintColor='#E4E1E1'
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
                  </View>
                )}

              {/* Success Step  */}
              {reframingModalIndex === reframingSteps.length - 1 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: 20,
                      width: windowWidth - 2 * 20,
                      padding: 25,
                      backgroundColor: 'white',
                      borderRadius: 30,
                      rowGap: 10,
                    }}
                  >
                    <Image
                      style={{ width: 106, height: 74 }}
                      resizeMode='contain'
                      source={require('../../assets/images/reframing_success_icon.png')}
                    />

                    <View style={{ marginTop: 10, rowGap: 10 }}>
                      <Text
                        style={
                          {
                            ...Fonts.sofiaProSemiBold[Platform.OS],
                            fontSize: 15,
                            textAlign: 'center',
                          } as TextStyle
                        }
                      >
                        Goed gedaan, {user?.firstName}. Je hebt jouw gedachte
                        succesvol gereframed!
                      </Text>
                      <Text
                        style={
                          {
                            ...Fonts.sofiaProRegular[Platform.OS],
                            fontSize: 13,
                            textAlign: 'center',
                          } as TextStyle
                        }
                      >
                        Hieronder staat jouw nieuwe bericht aan jezelf:
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 20,
                      width: windowWidth - 2 * 20,
                      padding: 25,
                      backgroundColor: 'white',
                      borderRadius: 30,
                      rowGap: 20,
                    }}
                  >
                    {successData.map((item, index) => {
                      return (
                        <View key={index} style={{ rowGap: 5 }}>
                          {item.heading !== null && (
                            <Text
                              style={
                                {
                                  ...Fonts.sofiaProSemiBold[Platform.OS],
                                } as TextStyle
                              }
                            >
                              {item.heading}
                            </Text>
                          )}
                          <Text
                            style={
                              {
                                ...Fonts.sofiaProRegular[Platform.OS],
                              } as TextStyle
                            }
                          >
                            {item.body}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
          {/* Progress Wrapper */}
          <View
            style={{
              position: 'absolute',
              bottom: 40,
              width: '100%',
              alignSelf: 'center',
              paddingHorizontal: 15,
            }}
          >
            {/* Progress Container */}
            <View style={styles.progressContainer}>
              {/* Buttons Container */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Go Back Button */}
                <Pressable
                  onPress={() => handlePrevious()}
                  disabled={reframingModalIndex == 0 ? true : false}
                  style={
                    reframingModalIndex == 0
                      ? [styles.backButton, { opacity: 0.4 }]
                      : styles.backButton
                  }
                >
                  <Text style={styles.buttonText}>Ga terug</Text>
                </Pressable>
                {/* Continue Button */}
                <Pressable
                  onPress={() => handleNext()}
                  style={
                    reframingModalIndex == reframingSteps.length - 1
                      ? [styles.continueButton, { width: 165 }]
                      : styles.continueButton
                  }
                >
                  <Text style={styles.buttonText}>
                    {reframingModalIndex == reframingSteps.length - 1
                      ? 'Opslaan en afsluiten'
                      : 'Ga verder'}
                  </Text>
                </Pressable>
              </View>
              {/* Progress Dots Container */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  columnGap: 7,
                }}
              >
                {Array.from({ length: reframingSteps.length }).map(
                  (_, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor:
                            index === reframingModalIndex
                              ? '#829c7a'
                              : '#E4E1E1',
                          borderRadius: 99,
                        }}
                      ></View>
                    );
                  }
                )}
              </View>
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
    padding: 25,
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
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  mainContainer: {
    flex: 1,
  },
  mainContentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  modalTitleText: {
    textAlign: 'center',
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  optionsText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 12,
    flexShrink: 1, // text wrap
  } as TextStyle,
  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 30,
    rowGap: 10,
  },
  progressContainer: {
    width: '100%',
    height: 115,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#a8c1a0',
  },
  backButtonText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  continueButton: {
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#5C6B57',
  },
  continueButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
  buttonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 13,
    color: 'white',
  } as TextStyle,
  worryListItemContainer: {
    marginTop: 20,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    width: '100%',
    paddingLeft: 12,
    paddingRight: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  worryListItemTitleText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  worryListItemDateText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 11,
  } as TextStyle,
  worryListItemDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  dynamicTextInputComponent: {
    ...Fonts.sofiaProRegular[Platform.OS],
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f6f7f8',
    height: 165,
  } as TextStyle,
});
