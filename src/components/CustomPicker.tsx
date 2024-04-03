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

export const CustomPicker: React.FC = () => {
  const [selected, setSelected] = useState('Angst');

  return (
    <View style={styles.container}>
      <Pressable>
        <ChevronLeft color='black' />
      </Pressable>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>{selected}</Text>
      </View>
      <Pressable>
        <ChevronRight color='black' />
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
