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
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const TextQuestion: React.FC<{ questions: string[][]; route: any }> = ({
  questions,
  route,
}) => {
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
  const [textQuestionIndex, setTextQuestionIndex] = useState<number>(0);

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

  const handlePrevious = () => {
    if (textQuestionIndex !== 0) {
      setTextQuestionIndex(textQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (textQuestionIndex === questions.length - 1) {
      setSliderQuestionIndex(0);
      setProgressValue(0.125);
      setHasData(true); // @TODO Remove leftover state from testing!
      navigation.navigate('Diary4');
    } else {
      setTextQuestionIndex(textQuestionIndex + 1);
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
        <AntDesign name='closecircleo' size={24} color='gray' />
      </Pressable>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Aanvullende vragen</Text>
      </View>

      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>
            Vraag {textQuestionIndex + 1}.{' '}
            <Text style={styles.questionText}>
              {questions[textQuestionIndex][0]}
            </Text>
          </Text>
        </View>
        <TextInput
          style={[
            styles.diaryEntryFieldTextInput,
            // @ts-ignore
            { outlineStyle: 'none' },
          ]}
          textAlignVertical='top'
          value={textValues.get(textQuestionIndex) ?? ''}
          onChangeText={(value) => addTextValue(textQuestionIndex, value)}
          multiline={true}
          placeholder={questions[textQuestionIndex][1]}
          placeholderTextColor='gray'
        ></TextInput>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}
      >
        <Pressable
          onPress={() => handlePrevious()}
          disabled={textQuestionIndex == 0 ? true : false}
          style={textQuestionIndex == 0 ? { opacity: 0.4 } : {}}
        >
          <MaterialCommunityIcons
            name='chevron-left-circle-outline'
            size={30}
            color='black'
          />
        </Pressable>

        <View style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}>
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor:
                    index === textQuestionIndex ? '#829c7a' : '#E4E1E1',
                  borderRadius: 99,
                }}
              ></View>
            );
          })}
        </View>

        <Pressable
          onPress={() => handleNext()}
          disabled={textQuestionIndex == questions.length - 1 ? true : false}
          style={
            textQuestionIndex == questions.length - 1 ? { opacity: 0.4 } : {}
          }
        >
          <MaterialCommunityIcons
            name='chevron-right-circle-outline'
            size={30}
            color='black'
          />
        </Pressable>
      </View>

      {textQuestionIndex == questions.length - 1 && (
        <Pressable onPress={() => handleNext()} style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Opslaan en afsluiten</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 100,
    width: windowWidth - 2 * 25,
    borderRadius: 30,
    borderColor: 'black',
    paddingHorizontal: 25,
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
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  questionContainer: {
    paddingVertical: 20,
  },
  questionLabel: {
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
  questionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
  diaryEntryFieldTextInput: {
    verticalAlign: Platform.OS == 'android'? "top" : {},
    fontSize: 14,
    height: 200,
    ...Fonts.sofiaProRegular[Platform.OS],
    borderRadius: 10,
    borderColor: 'black',
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F6F7F8',
  } as TextStyle,
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
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  modalDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
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
    ...Fonts.sofiaProMedium[Platform.OS],
    color: 'white',
  } as TextStyle,
  dontSaveAndCloseText: {
    ...Fonts.sofiaProMedium[Platform.OS],
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
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
  finishButton: {
    width: 170,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 12,
    marginVertical: 20,
    backgroundColor: '#5c6b57',
  },
  finishButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
});
