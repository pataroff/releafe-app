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

export const SliderQuestion: React.FC = ({ questions, route }) => {
  const {
    diaryEntries,
    sliderValues,
    sliderQuestionIndex,
    progressValue,
    setSliderQuestionIndex,
    setProgressValue,
    setCreatedAt,
    addSliderValue,
    resetSliderValues,
  } = useContext(DiaryContext);

  const navigation = useNavigation();

  const [selectedDiaryEntry, setSelectedDiaryEntry] =
    useState<IDiaryEntry | null>();

  const [sliderValue, setSliderValue] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.date) {
        setCreatedAt(route.params.date);
        checkForExistingDiaryEntry(route.params.date);
      } else {
        setCreatedAt(new Date());
        // checkForExistingDiaryEntry(new Date());
      }
    }, [diaryEntries, sliderValues, route.params?.date])
  );

  const checkForExistingDiaryEntry = (selectedDate: Date) => {
    const matchedDiaryEntry = diaryEntries.find(
      (entry) =>
        getFormattedDate(entry.createdAt) === getFormattedDate(selectedDate)
    );

    if (matchedDiaryEntry) {
      setSelectedDiaryEntry(matchedDiaryEntry);
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
      setProgressValue(progressValue - 0.167);
      setSliderValue(1);
    }
  };

  const handleNext = () => {
    if (selectedDiaryEntry) {
      addSliderValue(
        sliderQuestionIndex,
        //@ts-ignore
        selectedDiaryEntry.sliderValues.get(sliderQuestionIndex)
      );
    } else {
      addSliderValue(
        sliderQuestionIndex,
        Math.floor(sliderValues.get(sliderQuestionIndex) ?? sliderValue)
      );
    }
    // sliderValuesRef.current.set(questionIndex, Math.floor(sliderValue));
    if (sliderQuestionIndex < questions.length - 1) {
      setSliderQuestionIndex(sliderQuestionIndex + 1);
      setProgressValue(progressValue + 0.167);
      setSliderValue(1);
    } else {
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
      </Modal>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 10,
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.closeButton}
        >
          <AntDesign name='closecircleo' size={30} color='black' />
        </Pressable>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {questions[sliderQuestionIndex][0]}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Slider
            style={{ width: windowWidth - 2 * 40, height: 40 }}
            value={
              selectedDiaryEntry
                ? selectedDiaryEntry.sliderValues.get(sliderQuestionIndex)
                : sliderValues.get(sliderQuestionIndex) ?? sliderValue
            }
            onValueChange={(value) => setSliderValue(value)}
            minimumValue={1}
            maximumValue={10}
            minimumTrackTintColor='#000000'
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
            justifyContent:
              sliderQuestionIndex >= 1 ? 'space-between' : 'flex-end',
          }}
        >
          {sliderQuestionIndex >= 1 && (
            <Pressable onPress={handlePrevious} style={styles.button}>
              <Text style={styles.buttonText}>Ga terug</Text>
            </Pressable>
          )}
          <Pressable onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Ga verder</Text>
          </Pressable>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={progressValue}
            color='black'
            style={styles.progressBar}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    width: windowWidth - 2 * 20,
    height: 380,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  questionContainer: {
    paddingVertical: 20,
  },
  questionText: {
    position: 'absolute',
    left: 5,
    right: 5,
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  optionsText: {
    ...Fonts.poppinsMediumItalic[Platform.OS],
    fontSize: 12,
    fontStyle: 'italic',
  } as TextStyle,
  button: {
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 4,
    marginTop: 20,
  },
  buttonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  progressBarContainer: {
    marginTop: 50,
  },
  progressBar: {
    backgroundColor: '#dedede',
    borderRadius: 15,
    height: 10,
  },
  modalContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 315,
    borderWidth: 2,
    borderRadius: 30,
    height: 300,
    width: windowWidth - 2 * 10,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  modalDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  saveAndCloseButton: {
    borderWidth: 2,
    borderRadius: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 4,
    backgroundColor: 'black',
  },

  dontSaveAndCloseButton: {
    borderWidth: 2,
    borderRadius: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  saveAndCloseText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
  dontSaveAndCloseText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  cancelButton: {
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    width: 150,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  cancelButtonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
});
