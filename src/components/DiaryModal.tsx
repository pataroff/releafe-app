import React, { useState, useContext } from 'react';

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
} from 'react-native';

import { DiaryContext } from '../context/DiaryContext';
import { GoalContext } from '../context/GoalContext';

import { Slider } from '@rneui/themed';
import { CheckBox } from '@rneui/themed';
import { ProgressBar } from 'react-native-paper';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { IGoalEntry } from '../types';
import { sliderSteps, textSteps } from '../utils/diary';

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
}

const GoalsChecklistItem: React.FC<GoalsChecklistItemProps> = ({
  goal,
  checked,
  setCheckedGoals,
}) => {
  const { uuid, sentence } = goal;

  const modifySentence = (sentence: string): string => {
    const keywords = ['dagelijks', 'wekelijks', 'maandelijks'];
    const words = sentence.split(' ');
    const keywordIndex = words.findIndex((word) => keywords.includes(word));

    if (keywordIndex === -1) {
      return sentence;
    }

    const modifiedSentence = words.slice(keywordIndex + 2).join(' ');
    return `Ik heb vandaag ${modifiedSentence}`;
  };

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
      <Text style={styles.bodyText}>{modifySentence(sentence)}</Text>
    </View>
  );
};

export const DiaryModal: React.FC<DiaryModalProps> = ({
  modalDiaryVisible,
  setModalDiaryVisible,
}) => {
  const {
    addSliderValue,
    addTextValue,
    resetSliderValues,
    resetTextValues,
    createDiaryEntry,
  } = useContext(DiaryContext);

  const navigation = useNavigation();

  const { goalEntries, updateGoalEntry } = useContext(GoalContext);

  const totalSteps =
    goalEntries.length > 0
      ? sliderSteps.length + textSteps.length + 1
      : sliderSteps.length + textSteps.length;
  const totalStepsIndex = goalEntries.length > 0 ? totalSteps - 1 : totalSteps;
  const progressStep = Math.floor((1 / totalSteps) * 100) / 100;

  const [diaryModalIndex, setDiaryModalIndex] = useState<number>(0);
  const [progressValue, setProgressValue] = useState(progressStep);

  const [sliderValue, setSliderValue] = useState<number>(5);
  const [sliderQuestionIndex, setSliderQuestionIndex] = useState<number>(0);
  const [textValue, setTextValue] = useState<string>('');
  const [textQuestionIndex, setTextQuestionIndex] = useState<number>(0);
  const [checkedGoals, setCheckedGoals] = useState<string[]>([]);

  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const handlePrevious = () => {
    // Update slider values (0 to 5, including)
    if (diaryModalIndex != 0 && diaryModalIndex <= sliderSteps.length - 1) {
      setSliderValue(5);
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
      addSliderValue(sliderQuestionIndex, Math.round(sliderValue));
      setSliderValue(5);
      // Skip slider question index increment, if on last step
      if (diaryModalIndex !== sliderSteps.length - 1) {
        setSliderQuestionIndex((prev) => ++prev);
      }
    }

    // Update text values (7 to 10)
    if (diaryModalIndex > 6 && diaryModalIndex < totalStepsIndex) {
      addTextValue(textQuestionIndex, textValue);
      setTextValue('');
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
    setSliderValue(5);
    setCheckedGoals([]);
    setTextQuestionIndex(0);
  };

  const handleFinish = () => {
    // Create diary entry
    createDiaryEntry();

    // Update goal entries (if applicable)
    if (goalEntries.length > 0 && checkedGoals.length > 0) {
      for (const checkedGoal of checkedGoals) {
        updateGoalEntry(checkedGoal);
      }
    }

    // Close modal
    setModalDiaryVisible(!modalDiaryVisible);

    // Reset local state
    resetLocalState();

    // Reset context state
    resetSliderValues();
    resetTextValues();

    // Navigate to `DiaryFarewell`
    navigation.navigate('Diary2');
  };

  const handleClose = () => {
    // Close modal
    setModalDiaryVisible(!modalDiaryVisible);

    // Reset local state
    resetLocalState();

    // Reset context state
    resetSliderValues();
    resetTextValues();
  };

  const handleTextChange = (questionIndex: number, value: string) => {
    setTextValue(value);
    addTextValue(questionIndex, value);
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
                ? 'Vraag 7: Persoonlijke doelen'
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
                {/* REACT-NATIVE-ELEMENTS/SLIDER */}
                <View style={{ marginTop: 20 }}>
                  <Slider
                    value={sliderValue}
                    onValueChange={(value) => setSliderValue(value)}
                    style={{ width: '100%' }}
                    trackStyle={{ height: 15, borderRadius: 30 }}
                    thumbStyle={{
                      width: 28,
                      height: 28,
                    }}
                    thumbTintColor='#C1DEBE'
                    minimumValue={1}
                    maximumValue={10}
                    minimumTrackTintColor='#E4E1E1'
                    maximumTrackTintColor='#E4E1E1'
                  />
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
                {/* Goal Check Item */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.goalsChecklistContainer}
                  contentContainerStyle={styles.goalsChecklistContentContainer}
                >
                  {goalEntries.map((goal, index) => {
                    return (
                      <GoalsChecklistItem
                        key={index}
                        goal={goal}
                        checked={checkedGoals.includes(goal.uuid)}
                        setCheckedGoals={setCheckedGoals}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* Text Question Component */}
            {diaryModalIndex > 6 && (
              <View style={styles.componentContainer}>
                <Text style={[styles.bodyText, { fontSize: 14 }]}>
                  <Text
                    style={
                      { ...Fonts.poppinsSemiBold[Platform.OS] } as TextStyle
                    }
                  >
                    Vraag {textQuestionIndex + 1}:{' '}
                  </Text>
                  {textSteps[textQuestionIndex].question}
                </Text>
                <TextInput
                  value={textValue}
                  onChangeText={(value) =>
                    handleTextChange(textQuestionIndex, value)
                  }
                  placeholder={textSteps[textQuestionIndex].placeholder}
                  multiline
                  style={
                    {
                      ...Fonts.poppinsRegular[Platform.OS],
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#f6f7f8',
                      height: 165,
                    } as TextStyle
                  }
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
                      ? [styles.continueButton, { width: 165 }]
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
                  {progressValue * 100}%
                </Text>
                <ProgressBar
                  // @TODO: https://github.com/callstack/react-native-paper/issues/4544
                  animatedValue={progressValue}
                  color='#A9C1A1'
                  style={styles.progressBar}
                />
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
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
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
    rowGap: 10,
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
    ...Fonts.poppinsLight[Platform.OS],
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
    ...Fonts.poppinsRegular[Platform.OS],
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
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
  buttonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 13,
    color: 'white',
  } as TextStyle,
  headingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
    flexShrink: 1,
  } as TextStyle,
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsText: {
    ...Fonts.poppinsLight[Platform.OS],
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
});