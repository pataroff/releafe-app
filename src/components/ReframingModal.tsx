import React, { useState } from 'react';

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

import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../utils/toastConfig';

import { DropdownComponent } from './DropdownComponent';
import { CloseModal } from './CloseModal';

import { useWorry } from '../context/WorryContext';
import { useNote } from '../context/NoteContext';
import { useAuth } from '../context/AuthContext';

import { Priority } from '../types';
import { getCategory, getPriorityColor, reframingSteps } from '../utils/worry';

import { useGamification } from '../context/GamificationContext';

import { SharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

type StringStateSetterPair = {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

type NumberStateSetterPair = {
  value: SharedValue<number>;
  setter: (value: number) => void;
};

interface ReframingModalProps {
  route: any;
  reframingModalIndex: number;
  setReframingModalIndex: React.Dispatch<React.SetStateAction<number>>;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrawer?: () => void;
  earnedPointsModalVisible?: boolean;
  setEarnedPointsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReframingModal: React.FC<ReframingModalProps> = ({
  route,
  reframingModalIndex,
  setReframingModalIndex,
  modalReframingVisible,
  setModalReframingVisible,
  handleDrawer,
  earnedPointsModalVisible,
  setEarnedPointsModalVisible,
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
    resetWorryEntryFields,
  } = useWorry();
  const {
    feelingDescription,
    thoughtLikelihoodSliderOne,
    forThoughtEvidence,
    againstThoughtEvidence,
    friendAdvice,
    thoughtLikelihoodSliderTwo,
    thoughtLikelihood,
    alternativePerspective,
    setFeelingDescription,
    setThoughtLikelihoodSliderOne,
    setForThoughtEvidence,
    setAgainstThoughtEvidence,
    setFriendAdvice,
    setThoughtLikelihoodSliderTwo,
    setThoughtLikelihood,
    setAlternativePerspective,
    createOrUpdateNoteEntry,
    resetNoteEntryFields,
  } = useNote();

  const { user } = useAuth();

  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);
  const [showPriorityButtons, setShowPriorityButtons] =
    useState<boolean>(false);
  const { deleteWorryEntry } = useWorry();
  const [showUnreframedData, setShowUnreframedData] = useState<boolean>(false);

  const reframingModalTextState: Record<number, StringStateSetterPair> = {
    1: { value: feelingDescription, setter: setFeelingDescription },
    2: { value: forThoughtEvidence, setter: setForThoughtEvidence },
    3: { value: againstThoughtEvidence, setter: setAgainstThoughtEvidence },
    4: { value: friendAdvice, setter: setFriendAdvice },
    // skipping 5 on purpose
    6: { value: thoughtLikelihood, setter: setThoughtLikelihood },
    7: { value: alternativePerspective, setter: setAlternativePerspective },
  };

  const reframingModalSliderState: Record<number, NumberStateSetterPair> = {
    1: {
      value: thoughtLikelihoodSliderOne,
      setter: setThoughtLikelihoodSliderOne,
    },
    6: {
      value: thoughtLikelihoodSliderTwo,
      setter: setThoughtLikelihoodSliderTwo,
    },
  };

  const [sliderTouchedState, setSliderTouchedState] = useState<
    Record<number, boolean>
  >({
    1: false,
    6: false,
  });

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

  const successData = [
    { heading: null, body: alternativePerspective },
    { heading: 'Advies', body: friendAdvice },
    { heading: 'Tegenbewijs', body: againstThoughtEvidence },
    { heading: 'Waarschijnlijkheid', body: thoughtLikelihood },
  ];

  const min = useSharedValue(0);
  const max = useSharedValue(10);

  const currentStep = reframingSteps[reframingModalIndex];
  const currentSliderValue =
    reframingModalSliderState[reframingModalIndex]?.value;
  const currentSliderSetter =
    reframingModalSliderState[reframingModalIndex]?.setter;
  const currentTextValue = reframingModalTextState[reframingModalIndex]?.value;
  const currentTextSetter =
    reframingModalTextState[reframingModalIndex]?.setter;

  const CustomThumb: React.FC<{}> = () => {
    return (
      <View
        style={{
          backgroundColor: '#C1DEBE',
          height: 28,
          width: 28,
          borderRadius: 99,
        }}
      ></View>
    );
  };

  const handleClose = () => {
    setModalReframingVisible(!modalReframingVisible);
    setReframingModalIndex(0);

    resetWorryEntryFields();
    resetNoteEntryFields();

    if (route.name === 'WorryBox') {
      handleDrawer!();
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
      if (reframingModalIndex === 0) {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
          showToast('error', 'Titel ontbreekt nog', 'Voeg een titel toe.');
          return;
        }

        if (!trimmedDescription) {
          showToast(
            'error',
            'Omschrijving ontbreekt nog',
            'Voeg een omschrijving toe.'
          );
          return;
        }

        setTitle(trimmedTitle);
        setDescription(trimmedDescription);
      }

      if (currentTextValue !== undefined && currentTextSetter !== undefined) {
        const trimmedTextValue = currentTextValue.trim();

        if (!trimmedTextValue) {
          showToast(
            'error',
            'Antwoord ontbreekt nog',
            'Voeg een antwoord toe.'
          );

          return;
        }

        currentTextSetter(trimmedTextValue);
      }

      if (sliderTouchedState[reframingModalIndex] === false) {
        showToast(
          'error',
          'Slider niet bewogen',
          'Beweeg de slider om verder te gaan.'
        );
        return;
      }

      setReframingModalIndex(reframingModalIndex + 1);
    } else {
      setModalReframingVisible(!modalReframingVisible);
      setReframingModalIndex(0);
      setSliderTouchedState({
        1: false,
        6: false,
      });

      createOrUpdateNoteEntry();

      // @TODO Should these be combined in one if statement?
      if (route.name === 'WorryBox') {
        deleteWorryEntry(uuid);

        if (handleDrawer) {
          handleDrawer();
        }
      }

      resetWorryEntryFields();
      resetNoteEntryFields();

      if (setEarnedPointsModalVisible) {
        setTimeout(() => {
          setEarnedPointsModalVisible(!earnedPointsModalVisible);
        }, 100);
      }
    }
  };

  const handlePriority = (priority: Priority) => {
    setPriority(priority);
    setShowPriorityButtons(!showPriorityButtons);
  };

  const showToast = (
    type: 'error' | 'success' | 'info',
    title: string,
    message: string
  ) => {
    Toast.show({
      topOffset: 80,
      type,
      text1: title,
      text2: message,
    });
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalReframingVisible}
      onRequestClose={() => setCloseModalVisible(!closeModalVisible)}
      statusBarTranslucent={true}
    >
      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        parentModalVisible={modalReframingVisible}
        setParentModalVisible={setModalReframingVisible}
        title='Stoppen met reframen'
        description='Je staat op het punt te stoppen met het reframing-proces. Weet je het zeker?'
        handleClose={handleClose}
        denyText='Nee, ik wil doorgaan'
        confirmText='Ja, ik wil afsluiten'
      />
      <GestureHandlerRootView>
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
                <Text style={styles.headersTitleText}>Reframen</Text>
                <Pressable
                  style={{ position: 'absolute', right: 0 }}
                  onPress={() => setCloseModalVisible(!closeModalVisible)}
                >
                  <Feather name='x-circle' size={24} color='gray' />
                </Pressable>
              </View>

              {reframingModalIndex !== reframingSteps.length - 1 && (
                <View style={{ marginTop: 15 }}>
                  {/* Heading */}
                  <Text style={styles.headersHeadingText}>
                    {currentStep.heading}
                  </Text>

                  {/* Description (Dynamic) */}
                  {/* Step 0 – Conditional description based on route */}
                  {reframingModalIndex === 0 && (
                    <>
                      {route.name === 'WorryBox' ? (
                        <>
                          <Text style={styles.headersDescriptionText}>
                            De situatie is automatisch overgenomen uit je zorg.
                            Je kunt deze hier indien nodig aanpassen.{'\n\n'}Na
                            deze oefening krijg je een bericht aan jezelf. Dit
                            bericht wordt opgeslagen in je lijst met berichten.
                            De zorg verdwijnt dan automatisch uit je
                            Zorgenbakje.
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.headersDescriptionText}>
                            Na deze oefening krijg je een bericht aan jezelf.
                            Dit bericht wordt opgeslagen in je lijst met
                            berichten.
                          </Text>
                        </>
                      )}
                    </>
                  )}

                  {/* Step 1 – Show description from step data */}
                  {reframingModalIndex === 1 && (
                    <Text style={styles.headersDescriptionText}>
                      {currentStep.description}
                    </Text>
                  )}

                  {/* Step 2+ – Skip description, show question and instruction instead */}
                  {reframingModalIndex > 1 && (
                    <>
                      <Text
                        style={
                          {
                            ...Fonts.sofiaProSemiBold[Platform.OS],
                            marginTop: 10,
                          } as TextStyle
                        }
                      >
                        {currentStep.question}
                      </Text>
                      {currentStep.instruction && (
                        <Text style={styles.headersDescriptionText}>
                          {currentStep.instruction}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              )}

              {/* Worry List Item Preview */}
              {reframingModalIndex >= 1 && (
                <View style={[styles.worryListItemContainer]}>
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
              <View style={{ flex: 1, paddingBottom: 180 }}>
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
                              verticalAlign:
                                Platform.OS == 'android' ? 'top' : {},
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
                              verticalAlign:
                                Platform.OS == 'android' ? 'top' : {},
                              padding: 10,
                              borderRadius: 10,
                              backgroundColor: '#f6f7f8',
                              height: 180,
                            } as TextStyle
                          }
                          placeholder={currentStep.placeholder}
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
                    </View>
                  </>
                )}

                {reframingModalIndex > 0 &&
                  reframingModalIndex !== 5 &&
                  reframingModalIndex <= 7 && (
                    <View style={styles.textInputContainer}>
                      {/* Dynamic TextInput + Dynamic Slider Wrapper */}
                      <View
                        style={
                          reframingModalIndex === 6
                            ? {
                                flexDirection: 'column-reverse',
                                width: windowWidth - 2 * 40,
                              }
                            : { width: windowWidth - 2 * 40 }
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
                          placeholder={currentStep.placeholder}
                          //placeholderTextColor='#dedede'
                          multiline
                          value={currentTextValue}
                          onChangeText={(value) => currentTextSetter(value)}
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
                                Hoe groot denk je dat de kans is dat deze
                                gedachte realiteit wordt?
                              </Text>
                            )}
                            <View>
                              <View style={{ marginVertical: 25 }}>
                                <Slider
                                  progress={currentSliderValue}
                                  onValueChange={(value) => {
                                    currentSliderSetter(value);
                                    setSliderTouchedState((prev) => ({
                                      ...prev,
                                      [reframingModalIndex]: true,
                                    }));
                                  }}
                                  minimumValue={min}
                                  maximumValue={max}
                                  disableTrackPress={true}
                                  disableTapEvent={true}
                                  containerStyle={{ borderRadius: 30 }}
                                  sliderHeight={15}
                                  thumbWidth={25}
                                  theme={{
                                    minimumTrackTintColor: '#E4E1E1',
                                    maximumTrackTintColor: '#E4E1E1',
                                    bubbleBackgroundColor: '#C1DEBE',
                                  }}
                                  renderThumb={() => <CustomThumb />}
                                  // @TODO Remove the bubble!
                                  bubble={(s: number) => s.toFixed(1)}
                                />
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Text style={styles.optionsText}>
                                  Heel klein
                                </Text>
                                <Text style={styles.optionsText}>
                                  Heel groot
                                </Text>
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
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() =>
                            setShowUnreframedData(!showUnreframedData)
                          }
                        >
                          <Text style={styles.showOldSituationText}>
                            {showUnreframedData
                              ? 'Oude situatie verbergen'
                              : 'Oude situatie bekijken'}
                          </Text>

                          <Feather
                            name={
                              showUnreframedData ? 'chevron-up' : 'chevron-down'
                            }
                            size={20}
                            color={'gray'}
                          />
                        </Pressable>

                        {showUnreframedData &&
                          unreframedData.map((data, index) => (
                            <View key={index}>
                              <Text
                                style={[styles.headingText, { color: 'gray' }]}
                              >
                                {data.heading}
                              </Text>
                              <Text
                                style={[styles.bodyText, { color: 'gray' }]}
                              >
                                {data.body}
                              </Text>
                            </View>
                          ))}
                      </View>
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
                        ? [styles.continueButton, { width: 150 }]
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
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
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
    marginTop: 10,
  } as TextStyle,
  mainContainer: {
    flex: 1,
  },
  mainContentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100,
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
    height: 60,
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
    verticalAlign: Platform.OS == 'android' ? 'top' : {},
    ...Fonts.sofiaProRegular[Platform.OS],
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f6f7f8',
    height: 165,
  } as TextStyle,
  showOldSituationText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 11,
    color: 'gray',
  } as TextStyle,
  headingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
});
