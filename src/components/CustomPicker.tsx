import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  Platform,
  Pressable,
} from 'react-native';

import { Fonts } from '../styles';
import { ChevronLeft, ChevronRight } from 'react-native-feather';

const options = [
  'Algehele stemming',
  'Angst',
  'Stress',
  'Energie',
  'Focus en concentratie',
  'Slaap',
];

export const CustomPicker: React.FC = () => {
  const [optionsIndex, setOptionsIndex] = useState(1);
  const [selected, setSelected] = useState(options[optionsIndex]);

  const handlePrev = () => {
    if (optionsIndex > 0) {
      setOptionsIndex(optionsIndex - 1);
      setSelected(options[optionsIndex - 1]);
    }
  };

  const handleNext = () => {
    if (optionsIndex < options.length - 1) {
      setOptionsIndex(optionsIndex + 1);
      setSelected(options[optionsIndex + 1]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        disabled={optionsIndex === 0 ? true : false}
        onPress={() => handlePrev()}
      >
        {optionsIndex === 0 ? (
          <ChevronLeft color='#dedede' />
        ) : (
          <ChevronLeft color='black' />
        )}
      </Pressable>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>{selected}</Text>
      </View>
      <Pressable
        disabled={optionsIndex === options.length - 1 ? true : false}
        onPress={() => handleNext()}
      >
        {optionsIndex === options.length - 1 ? (
          <ChevronRight color='#dedede' />
        ) : (
          <ChevronRight color='black' />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedContainer: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 4,
  },
  selectedText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
