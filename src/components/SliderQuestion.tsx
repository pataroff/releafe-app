import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';
import { Fonts, Typography } from '../styles';
import { AntDesign } from '@expo/vector-icons';

import Slider from '@react-native-community/slider';
import { ProgressBar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export const SliderQuestion: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(1);

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
        <Pressable style={styles.closeButton}>
          <AntDesign name='closecircleo' size={30} color='black' />
        </Pressable>
        <Text style={styles.questionText}>
          Hoe zou je je algehele {'\n'}stemming vandaag beoordelen?
        </Text>
        <View>
          <Slider
            style={{ width: 310, height: 40 }}
            value={sliderValue}
            onValueChange={setSliderValue}
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
        <Pressable
          onPress={() => console.log(sliderValue)}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Ga verder</Text>
        </Pressable>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={0.5}
            color='black'
            style={{
              backgroundColor: '#dedede',
              borderRadius: 15,
              height: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 2 * 20,
    height: 350,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 8,
  },
  questionText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
    alignSelf: 'center',
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
  continueButton: {
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 4,
    marginTop: 20,
  },
  continueButtonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  progressBar: {
    marginTop: 50,
  },
});
