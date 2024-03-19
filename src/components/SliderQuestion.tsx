import React, { useState, useContext } from 'react';
import { DiaryContext } from '../context/DiaryContext';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';
import { Fonts } from '../styles';
import { AntDesign } from '@expo/vector-icons';

import Slider from '@react-native-community/slider';
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const SliderQuestion: React.FC = ({ questions }) => {
  const { addSliderValue } = useContext(DiaryContext);

  const navigation = useNavigation();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [progressValue, setProgressValue] = useState(0);

  const handlePrevious = () => {
    setQuestionIndex(questionIndex - 1);
    setProgressValue(progressValue - 0.167);
    setSliderValue(1);
  };

  const handleNext = () => {
    addSliderValue(questionIndex, Math.floor(sliderValue));
    // sliderValuesRef.current.set(questionIndex, Math.floor(sliderValue));
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setProgressValue(progressValue + 0.167);
      setSliderValue(1);
    } else {
      navigation.navigate('Diary3');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 10,
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate('Diary1')}
          style={styles.closeButton}
        >
          <AntDesign name='closecircleo' size={30} color='black' />
        </Pressable>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[questionIndex]}</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Slider
            style={{ width: windowWidth - 2 * 40, height: 40 }}
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
            minimumValue={1}
            maximumValue={10}
            minimumTrackTintColor='#000000'
            maximumTrackTintColor='#dedede'
          />
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsText}>Heel slecht</Text>
          <Text style={styles.optionsText}>Heel goed</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: questionIndex >= 1 ? 'space-between' : 'flex-end',
          }}
        >
          {questionIndex >= 1 && (
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
});
