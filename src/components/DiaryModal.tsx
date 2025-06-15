import React, { useState, useEffect, useCallback, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Dimensions,
  Platform,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';

import { useDiary } from '../context/DiaryContext';
import { useGoal } from '../context/GoalContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSharedValue, cancelAnimation } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';

import { CheckBox } from '@rneui/themed';
import { ProgressBar } from 'react-native-paper';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { IGoalEntry, Timeframe } from '../types';
import { sliderSteps, textSteps, getFormattedDate } from '../utils/diary';

import { useNavigation } from '@react-navigation/native';
import { CloseModal } from './CloseModal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface GoalsChecklistItemProps {
  goal: IGoalEntry;
  checked: boolean;
  setCheckedGoals: React.Dispatch<React.SetStateAction<string[]>>;
}

interface DiaryModalProps {
  modalDiaryVisible: boolean;
  setModalDiaryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  route: any;
}

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

const GoalsChecklistItem: React.FC<GoalsChecklistItemProps> = ({
  goal,
  checked,
  setCheckedGoals,
}) => {
  const { uuid, diarySentence } = goal;

  const handleCheckbox = () => {
    const newChecked = !checked;
    setCheckedGoals((prev) => {
      if (newChecked) {
        return [...prev, uuid];
      } else return prev.filter((id) => id !== uuid);
    });
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
      }}
    >
      <CheckBox
        containerStyle={styles.checkboxContainerStyle}
        size={40}
        checked={checked}
        onPress={handleCheckbox}
        iconType='material-community'
        checkedIcon='checkbox-marked'
        uncheckedIcon='checkbox-blank'
        uncheckedColor='#E5F1E3'
        checkedColor='#C1DEBE'
      />
      <Text style={styles.bodyText}>{diarySentence}</Text>
    </View>
  );
};

export const DiaryModal: React.FC<DiaryModalProps> = ({
  modalDiaryVisible,
  setModalDiaryVisible,
  route,
}) => {
  const {
    diaryEntries,
    sliderValues,
    date,
    textValues,
    setSliderValues,
    setTextValues,
    addSliderValue,
    addTextValue,
    setDate,
    resetSliderValues,
    resetTextValues,
    createOrUpdateDiaryEntry,
  } = useDiary();

  const { goalEntries, updateGoalEntry } = useGoal();

  // Handle incoming date from route
  useEffect(() => {
    if (route?.params?.date) {
      setDate(route.params.date);
      setModalDiaryVisible(true);
    }
  }, [route?.params?.date]);

  // Populate values if diary entry exists for current date
  useEffect(() => {
    const formattedDate = getFormattedDate(date);
    const matchedEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === formattedDate
    );

    if (matchedEntry) {
      setSliderValues(matchedEntry.sliderValues);
      setTextValues(matchedEntry.textValues);
    }
  }, [date, diaryEntries]);

  const navigation = useNavigation();

  const totalSteps =
    goalEntries.length > 0
      ? sliderSteps.length + textSteps.length + 1
      : sliderSteps.length + textSteps.length;
  const totalStepsIndex = goalEntries.length > 0 ? totalSteps - 1 : totalSteps;
  const progressStep = Math.floor((1 / totalSteps) * 100) / 100;

  const [diaryModalIndex, setDiaryModalIndex] = useState<number>(0);
  const [progressValue, setProgressValue] = useState(progressStep);

  const [sliderQuestionIndex, setSliderQuestionIndex] = useState<number>(0);
  const [textQuestionIndex, setTextQuestionIndex] = useState<number>(0);
  const [checkedGoals, setCheckedGoals] = useState<string[]>([]);

  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const min = useSharedValue(1);
  const max = useSharedValue(10);
  const sliderValue = useSharedValue(5.5);

  // Slider Value Update
  useEffect(() => {
    const value = sliderValues[sliderQuestionIndex];
    sliderValue.value = value !== undefined ? value : 5.5;
  }, [sliderQuestionIndex, sliderValues]);

  const handlePrevious = () => {
    // Update slider values (0 to 5, including)
    if (diaryModalIndex != 0 && diaryModalIndex <= sliderSteps.length - 1) {
      setSliderQuestionIndex((prev) => --prev);
    }

    // Update text values (7 to 10)
    if (diaryModalIndex > 7 && diaryModalIndex <= totalStepsIndex) {
      setTextQuestionIndex((prev) => --prev);
    }

    // Update navigation, check for personal goals on index 7
    if (goalEntries.length === 0 && diaryModalIndex === 7) {
      setDiaryModalIndex((prev) => prev - 2);
      setProgressValue((prev) => Math.max(0, prev - progressStep));
    } else {
      setDiaryModalIndex((prev) => --prev);
      setProgressValue((prev) => Math.max(0, prev - progressStep));
    }
  };

  const handleNext = () => {
    // Update slider values (0 to 5, excluding)
    if (diaryModalIndex < sliderSteps.length) {
      addSliderValue(sliderQuestionIndex, sliderValue.value);
      // Skip slider question index increment, if on last step
      if (diaryModalIndex !== sliderSteps.length - 1) {
        setSliderQuestionIndex((prev) => ++prev);
      }
    }

    // Update text values (7 to 10)
    if (diaryModalIndex > 6 && diaryModalIndex < totalStepsIndex) {
      setTextQuestionIndex((prev) => ++prev);
    }

    // Update navigation, check for personal goals on index 5
    if (goalEntries.length === 0 && diaryModalIndex === 5) {
      setDiaryModalIndex((prev) => prev + 2);
      setProgressValue((prev) => Math.min(1, prev + progressStep));
    } else {
      setDiaryModalIndex((prev) => ++prev);
      setProgressValue((prev) => Math.min(1, prev + progressStep));
    }
  };

  const resetLocalState = () => {
    setDiaryModalIndex(0);
    setProgressValue(progressStep);
    setSliderQuestionIndex(0);
    // Clears the passed params for editing
    navigation.setParams({ date: null });
    setDate(new Date()); // Is this needed?
    setCheckedGoals([]);
    setTextQuestionIndex(0);
  };

  const handleFinish = () => {
    // Check if a diary entry already exists for that date
    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) == getFormattedDate(date)
    );

    // Create or update a diary entry
    createOrUpdateDiaryEntry();

    let totalPoints = 0;
    let calculatedPoints = 0;
    let goalCompleted = false;
    let showEarnedPointsModal = true;

    // Check if there are goals that need to be updated
    if (checkedGoals.length > 0) {
      for (const checkedGoal of checkedGoals) {
        const updatedGoalEntry = updateGoalEntry(checkedGoal, date);

        if (!updatedGoalEntry) continue;

        if (
          updatedGoalEntry.completedTimeframe ===
          updatedGoalEntry.targetFrequency
        ) {
          switch (updatedGoalEntry.timeframe) {
            case Timeframe.Monthly:
              calculatedPoints += 50;
              break;
            case Timeframe.Weekly:
              calculatedPoints += 30;
              break;
            case Timeframe.Daily:
              calculatedPoints += 10;
              break;
            default:
              calculatedPoints += 10;
          }
        }
      }

      if (calculatedPoints > 0) {
        goalCompleted = true;
      }
    }

    totalPoints = !matchedDiaryEntry ? calculatedPoints + 10 : calculatedPoints;

    if (totalPoints <= 0) {
      showEarnedPointsModal = false;
    }

    // Close modal
    setModalDiaryVisible(!modalDiaryVisible);

    // Reset local state
    resetLocalState();

    // Reset context state
    resetSliderValues();
    resetTextValues();

    // Navigate to `DiaryFarewell`
    navigation.navigate('Diary', {
      screen: 'Diary2',
      params: {
        showEarnedPointsModal,
        earnedPoints: totalPoints,
        goalCompleted,
      },
    });
  };

  const handleClose = async (shouldSave: boolean) => {
    if (shouldSave) {
      createOrUpdateDiaryEntry();
    }

    // Close modal and reset states regardless
    setModalDiaryVisible(false);
    resetLocalState();
  };

  const handleTextChange = useCallback(
    (questionIndex: number, value: string) => {
      addTextValue(questionIndex, value);
    },
    [textQuestionIndex]
  );

  const shouldShowGoal = (goal: IGoalEntry): boolean => {
    return !goal.completedDates.includes(date.toISOString().split('T')[0]);
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalDiaryVisible}
      onRequestClose={() => setCloseModalVisible(!closeModalVisible)}
    >
      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        parentModalVisible={modalDiaryVisible}
        setParentModalVisible={setModalDiaryVisible}
        title='Stoppen met invullen dagboek'
        description='Je staat op het punt te stoppen met het invullen van je dagboek. Weet je het zeker?'
        handleClose={handleClose}
        route={route}
        denyText='Opslaan en afsluiten'
        confirmText='Niet opslaan en afsluiten'
      />
      {/* This is required in order for the slider to work on Android! */}
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
                <Text style={styles.headersTitleText}>Dagboek invullen</Text>
                <Pressable
                  style={{ position: 'absolute', right: 0 }}
                  onPress={() => setCloseModalVisible(!closeModalVisible)}
                >
                  <Feather name='x-circle' size={24} color='gray' />
                </Pressable>
              </View>

              {/* Heading */}
              <Text style={styles.headersHeadingText}>
                {diaryModalIndex == 6
                  ? 'Vraag 7. Persoonlijke doelen'
                  : diaryModalIndex < 6
                  ? sliderSteps[sliderQuestionIndex].heading
                  : 'Aanvullende vragen'}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              {/* Slider Question Component */}
              {diaryModalIndex < 6 && (
                <View style={styles.componentContainer}>
                  <Text style={styles.headingText}>
                    {sliderSteps[sliderQuestionIndex].question}
                  </Text>
                  <View style={{ marginVertical: 25 }}>
                    <Slider
                      progress={sliderValue}
                      onSlidingComplete={(value) => {
                        const clampedValue = Math.min(
                          Math.max(value, min.value),
                          max.value
                        );

                        addSliderValue(sliderQuestionIndex, clampedValue);
                      }}
                      minimumValue={min}
                      maximumValue={max}
                      disableTrackPress={true}
                      disableTapEvent={true}
                      containerStyle={{ borderRadius: 30, width: '100%' }}
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
                  {/* Slider Options Container */}
                  <View style={styles.optionsContainer}>
                    <Text style={styles.optionsText}>
                      {sliderSteps[sliderQuestionIndex].options[0]}
                    </Text>
                    <Text style={styles.optionsText}>
                      {sliderSteps[sliderQuestionIndex].options[1]}
                    </Text>
                  </View>
                </View>
              )}

              {/* Goals Checklist Component */}
              {diaryModalIndex == 6 && (
                <View
                  style={[
                    styles.componentContainer,
                    { maxHeight: windowHeight - 400 },
                  ]}
                >
                  <Text style={styles.headingText}>
                    Vink aan welke van de volgende doelen jij vandaag hebt
                    behaald.
                  </Text>

                  {/* Goal Completion Text */}
                  {goalEntries.filter(shouldShowGoal).length === 0 ? (
                    <Text style={styles.noGoalsText}>
                      🎉 Je hebt vandaag al je doelen behaald!
                    </Text>
                  ) : (
                    <ScrollView
                      style={styles.goalsChecklistContainer}
                      contentContainerStyle={
                        styles.goalsChecklistContentContainer
                      }
                    >
                      {/* Goal Checklist Container */}
                      {goalEntries.filter(shouldShowGoal).map((goal, index) => (
                        <GoalsChecklistItem
                          key={index}
                          goal={goal}
                          checked={checkedGoals.includes(goal.uuid)}
                          setCheckedGoals={setCheckedGoals}
                        />
                      ))}
                    </ScrollView>
                  )}
                </View>
              )}

              {/* Text Question Component */}
              {diaryModalIndex > 6 && (
                <View style={styles.componentContainer}>
                  <Text style={[styles.bodyText]}>
                    {textSteps[textQuestionIndex].question}
                  </Text>
                  <TextInput
                    style={
                      {
                        ...Fonts.sofiaProRegular[Platform.OS],
                        marginTop: 20,
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: '#f6f7f8',
                        height: 165,
                      } as TextStyle
                    }
                    value={textValues[textQuestionIndex] || ''}
                    onChangeText={(value) =>
                      handleTextChange(textQuestionIndex, value)
                    }
                    placeholder={textSteps[textQuestionIndex].placeholder}
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    multiline
                    scrollEnabled
                    autoFocus
                    textAlign='left'
                    textAlignVertical='top'
                  />
                </View>
              )}
            </View>

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
                    disabled={diaryModalIndex == 0 ? true : false}
                    style={
                      diaryModalIndex == 0
                        ? [styles.backButton, { opacity: 0.4 }]
                        : styles.backButton
                    }
                  >
                    <Text style={styles.buttonText}>Ga terug</Text>
                  </Pressable>
                  {/* Continue Button */}
                  <Pressable
                    onPress={
                      diaryModalIndex == totalStepsIndex
                        ? handleFinish
                        : handleNext
                    }
                    style={
                      diaryModalIndex == totalStepsIndex
                        ? [styles.continueButton, { width: 150 }]
                        : styles.continueButton
                    }
                  >
                    <Text style={styles.buttonText}>
                      {diaryModalIndex == totalStepsIndex
                        ? 'Afronden en sluiten'
                        : 'Ga verder'}
                    </Text>
                  </Pressable>
                </View>
                {/* Progress Bar Container */}
                <View style={styles.progressBarContainer}>
                  <Text style={styles.progressBarText}>
                    {diaryModalIndex == totalStepsIndex
                      ? '100%'
                      : Math.round(progressValue * 100) + '%'}
                  </Text>
                  <ProgressBar
                    // Jan prefers switching to the steps to keep the design more consistent!
                    progress={progressValue}
                    color='#A9C1A1'
                    style={styles.progressBar}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
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
    marginTop: 20,
  } as TextStyle,
  componentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    width: windowWidth - 2 * 20,
    marginHorizontal: 20,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 30,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  progressBarContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 5,
  },
  progressBarText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 11,
  } as TextStyle,
  progressBar: {
    backgroundColor: '#dedede',
    borderRadius: 15,
    height: 10,
    width: 215,
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
  headingText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
    flexShrink: 1,
  } as TextStyle,
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 13,
    flexShrink: 1, // text wrap
  } as TextStyle,
  goalsChecklistContainer: {
    marginTop: 20,
  },
  goalsChecklistContentContainer: {
    flexGrow: 1,
    rowGap: 20,
  },
  checkboxContainerStyle: {
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  noGoalsText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  } as TextStyle,
});
