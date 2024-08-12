import React, { useState, useContext } from 'react';
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
import Feather from '@expo/vector-icons/Feather';

import { DiaryContext } from '../context/DiaryContext';

const options = [
  'Algehele stemming',
  'Angst',
  'Stress',
  'Energie',
  'Focus en concentratie',
  'Slaap',
];

export const CustomMultiPicker: React.FC = ({ selected }) => {
  const { hasData } = useContext(DiaryContext);

  return (
    <View>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>
          {hasData === true && (selected === 1 || selected === 2)
            ? 'Meerdere'
            : 'Angst'}
        </Text>
        <Pressable style={styles.chevronDown}>
          <Feather name='chevron-down' size={24} color='black' />
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
