import React, { SetStateAction, useState } from 'react';
import { Platform, StyleSheet, View, TextStyle } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { Fonts } from '../styles';

const data = [
  { label: 'Algeheel gevoel', value: 'algeheel' },
  { label: 'Angst & zorgen', value: 'angst' },
  { label: 'Stress', value: 'stress' },
  { label: 'Energie', value: 'energie' },
  { label: 'Concentratie', value: 'concentratie' },
  { label: 'Slaap', value: 'slaap' },
];

interface MultiSelectDropdownProps {
  selectedFields: string[];
  setSelectedFields: React.Dispatch<SetStateAction<string[]>>;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedFields,
  setSelectedFields,
}) => {
  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField='label'
        valueField='value'
        placeholder='Select field'
        searchPlaceholder='Search...'
        value={selectedFields}
        onChange={(item) => {
          setSelectedFields(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  container: { padding: 12, marginHorizontal: 32 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  selectedTextStyle: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 12,
  } as TextStyle,
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
