import React, { useState, useCallback, useContext } from 'react';
import { DiaryContext } from '../context/DiaryContext';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
  Modal,
} from 'react-native';
import { Fonts } from '../styles';
import { AntDesign } from '@expo/vector-icons';

import Slider from '@react-native-community/slider';
import { ProgressBar } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { IDiaryEntry } from '../types';

const windowWidth = Dimensions.get('window').width;

const screenTitles = [
  'Algeheel gevoel',
  'Angst & zorgen',
  'Stress',
  'Energie',
  'Concentratie',
  'Slaap',
];

export const SliderQuestion: React.FC<{
  questions: string[][];
  route: any;
}> = ({ questions, route }) => {
  const {
    diaryEntries,
    sliderValues,
    sliderQuestionIndex,
    progressValue,
    setSliderQuestionIndex,
    setProgressValue,
    setDate,
    addSliderValue,
    resetSliderValues,
  } = useContext(DiaryContext);
  const navigation = useNavigation();

  const [selectedDiaryEntry, setSelectedDiaryEntry] =
    useState<IDiaryEntry | null>();

  const [sliderValue, setSliderValue] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.date) {
        setDate(route.params.date);
        checkForExistingDiaryEntry(route.params.date);
      } else {
        setDate(new Date());
      }
    }, [diaryEntries, sliderValues, route.params?.date])
  );

  const checkForExistingDiaryEntry = (selectedDate: Date) => {
    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === getFormattedDate(selectedDate)
    );

    if (matchedDiaryEntry) {
      setSelectedDiaryEntry(matchedDiaryEntry);
      //@ts-ignore
      setSliderValue(matchedDiaryEntry.sliderValues.get(sliderQuestionIndex));
    } else {
      setSelectedDiaryEntry(null);
    }
  };

  const handleSaveAndClose = () => {
    setSliderQuestionIndex(0);
    setProgressValue(0);
    navigation.navigate('Diary1');
  };

  const handleDontSaveAndClose = () => {
    setSliderQuestionIndex(0);
    setProgressValue(0);
    resetSliderValues();
    navigation.navigate('Diary1');
  };

  const handlePrevious = () => {
    if (sliderQuestionIndex > 0) {
      setSliderQuestionIndex(sliderQuestionIndex - 1);
      setProgressValue(progressValue - 0.125);
      setSliderValue(5);
    }
  };

  const handleNext = () => {
    if (selectedDiaryEntry) {
      addSliderValue(
        sliderQuestionIndex,
        //@ts-ignore
        selectedDiaryEntry.sliderValues.get(sliderQuestionIndex) != sliderValue
          ? Math.floor(sliderValue)
          : selectedDiaryEntry.sliderValues.get(sliderQuestionIndex)
      );
    } else {
      addSliderValue(
        sliderQuestionIndex,
        Math.floor(sliderValues.get(sliderQuestionIndex) ?? sliderValue)
      );
    }
    if (sliderQuestionIndex < questions.length - 1) {
      setSliderQuestionIndex(sliderQuestionIndex + 1);
      setProgressValue(progressValue + 0.125);
      setSliderValue(5);
    } else {
      setSliderValue(5);
      navigation.navigate('Diary3', { date: route.params?.date });
    }
  };

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.modalTitleText}>
                Stoppen met invullen dagboek
              </Text>
              <Text style={styles.modalDescriptionText}>
                Je staat op het punt om het dagboek af te sluiten.
              </Text>
              <View style={{ rowGap: 10, marginTop: 20 }}>
                <Pressable
                  style={styles.saveAndCloseButton}
                  onPress={() => handleSaveAndClose()}
                >
                  <Text style={styles.saveAndCloseText}>
                    Opslaan en afsluiten
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.dontSaveAndCloseButton}
                  onPress={() => handleDontSaveAndClose()}
                >
                  <Text style={styles.dontSaveAndCloseText}>
                    Niet opslaan en afsluiten
                  </Text>
                </Pressable>
              </View>
            </View>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.cancelButtonText}>Annuleren</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 10,
          paddingHorizontal: 25,
          position: 'relative',
        }}
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.closeButton}
        >
          <AntDesign name='closecircleo' size={24} color='gray' />
        </Pressable>

        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            {screenTitles[sliderQuestionIndex]}
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {questions[sliderQuestionIndex][0]}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Slider
            style={{ width: windowWidth - 2 * 50, height: 40 }}
            value={
              selectedDiaryEntry
                ? selectedDiaryEntry.sliderValues.get(sliderQuestionIndex)
                : sliderValues.get(sliderQuestionIndex) ?? sliderValue
            }
            onValueChange={(value) => setSliderValue(value)}
            minimumValue={1}
            maximumValue={10}
            thumbTintColor='#A5B79F'
            minimumTrackTintColor='#A9C1A1'
            maximumTrackTintColor='#dedede'
          />
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsText}>
            {questions[sliderQuestionIndex][1]}
          </Text>
          <Text style={styles.optionsText}>
            {questions[sliderQuestionIndex][2]}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={handlePrevious}
            disabled={sliderQuestionIndex == 0 ? true : false}
            style={
              sliderQuestionIndex == 0
                ? [styles.backButton, { opacity: 0.4 }]
                : styles.backButton
            }
          >
            <Text style={styles.buttonText}>Ga terug</Text>
          </Pressable>

          <Pressable onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.buttonText}>Ga verder</Text>
          </Pressable>
        </View>
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressBarText}>{progressValue * 100}%</Text>
          <ProgressBar
            progress={progressValue}
            color='#A9C1A1'
            style={styles.progressBar}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 100,
    width: windowWidth - 2 * 30,
    borderRadius: 30,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 1,
  },
  headingContainer: {
    marginTop: 30,
  },
  headingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  questionContainer: {
    paddingVertical: 20,
  },
  questionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  optionsText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
    flexShrink: 1, // text wrap
  } as TextStyle,
  backButton: {
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    marginTop: 20,
    backgroundColor: '#a8c1a0',
  },
  nextButton: {
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    marginTop: 20,
    backgroundColor: '#5c6b57',
  },
  buttonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  progressBarContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 5,
    marginTop: 50,
    marginBottom: 30,
  },
  progressBarText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBar: {
    backgroundColor: '#dedede',
    borderRadius: 15,
    height: 10,
    width: 250,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    borderRadius: 30,
    height: 270,
    width: windowWidth - 2 * 15,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  modalDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  saveAndCloseButton: {
    borderRadius: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 5,
    backgroundColor: '#A9C1A1',
  },
  dontSaveAndCloseButton: {
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  saveAndCloseText: {
    ...Fonts.poppinsMedium[Platform.OS],
    color: 'white',
  } as TextStyle,
  dontSaveAndCloseText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
  cancelButton: {
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    width: 150,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  cancelButtonText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
});
