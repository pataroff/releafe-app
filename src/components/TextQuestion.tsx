import React, { useState, useCallback, useContext } from 'react';
import { DiaryContext } from '../context/DiaryContext';

import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { IDiaryEntry } from '../types';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const TextQuestion: React.FC = ({ questions, route }) => {
  const {
    diaryEntries,
    textValues,
    setTextValues,
    addTextValue,
    setSliderQuestionIndex,
    setProgressValue,
    setHasData,
    resetSliderValues,
    resetTextValues,
  } = useContext(DiaryContext);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.date) {
        checkForExistingDiaryEntry(route.params.date);
      }
    }, [diaryEntries, route.params?.date])
  );

  const checkForExistingDiaryEntry = (selectedDate: Date) => {
    const matchedDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === getFormattedDate(selectedDate)
    );

    if (matchedDiaryEntry) {
      setTextValues(matchedDiaryEntry.textValues);
    }
  };

  const handleFinish = () => {
    // `DiaryFarewell` calls both `resetSliderValues` and `resetTextValues`!
    setSliderQuestionIndex(0);
    setProgressValue(0);
    setHasData(true); // @TODO Remove leftover state from testing!
    navigation.navigate('Diary4');
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
    resetTextValues();
    navigation.navigate('Diary1');
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
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.closeButton}
      >
        <AntDesign name='closecircleo' size={30} color='black' />
      </Pressable>
      {questions.map((question, index) => {
        return (
          <View key={index}>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{questions[index]}</Text>
            </View>
            <TextInput
              style={[
                styles.diaryEntryFieldTextInput,
                { outlineStyle: 'none' },
              ]}
              textAlignVertical='top'
              value={textValues.get(index) ?? ''}
              onChangeText={(value) => addTextValue(index, value)}
              multiline={true}
              placeholder='Schrijf het hier op...'
              placeholderTextColor='black'
            ></TextInput>
          </View>
        );
      })}
      <Pressable onPress={handleFinish} style={styles.button}>
        <Text style={styles.buttonText}>Afronden</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 100,
    width: windowWidth - 2 * 25,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingHorizontal: 25,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  questionContainer: {
    paddingVertical: 20,
  },
  questionText: {
    left: 5,
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  diaryEntryFieldTextInput: {
    fontSize: 14,
    height: 200,
    ...Fonts.poppinsItalic[Platform.OS],
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingTop: 20,
    paddingLeft: 20,
  } as TextStyle,
  button: {
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 4,
    marginVertical: 30,
  },
  buttonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
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
    borderRadius: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 5,
    backgroundColor: '#A9C1A1',
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
