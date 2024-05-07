import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  Platform,
  Pressable,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';
import { ChevronDown } from 'react-native-feather';

const options = [
  'Algehele stemming',
  'Angst',
  'Stress',
  'Energie',
  'Focus en concentratie',
  'Slaap',
];

export const CustomMultiPicker: React.FC = ({ selected }) => {
  return (
    <View>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>
          {selected === 1 || selected === 2 ? 'Meerdere' : 'Angst'}
        </Text>
        <Pressable style={styles.chevronDown}>
          <ChevronDown color={'black'} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  selectedContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: 130,
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 5,
    paddingRight: 10,
  },
  chevronDown: {
    position: 'absolute',
    left: 95,
    top: 5,
  },
  selectedText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
    alignSelf: 'center',
    marginRight: 15,
  } as TextStyle,
});
