import React, { SetStateAction, useState } from 'react';
import { Platform, StyleSheet, View, Text, TextStyle } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { CheckBox } from '@rneui/themed';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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

interface CheckboxItemProps {
  item: { label: string; value: string };
  checked: boolean;
  setSelectedFields: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  item,
  checked,
  setSelectedFields,
}) => {
  const { label, value } = item;

  const handleCheckbox = () => {
    const newChecked = !checked;
    setSelectedFields((prev: string[]) => {
      if (newChecked) {
        return [...prev, value];
      } else return prev.filter((field) => field !== value);
    });
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingLeft: 15,
        paddingRight: 5,
      }}
    >
      <Text style={{ ...Fonts.poppinsRegular[Platform.OS] } as TextStyle}>
        {label}
      </Text>
      <CheckBox
        checked={checked}
        onPress={() => handleCheckbox()}
        iconType='material-community'
        checkedIcon='checkbox-marked'
        uncheckedIcon='checkbox-blank'
        uncheckedColor='#E5F1E3'
        checkedColor='#C1DEBE'
      />
    </View>
  );
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedFields,
  setSelectedFields,
}) => {
  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        itemContainerStyle={{
          backgroundColor: '#ffffff',
          borderBottomColor: '#DDDDDD',
          borderBottomWidth: 0.5,
        }}
        containerStyle={{
          borderTopStartRadius: 0,
          borderTopEndRadius: 0,
          borderRadius: 30,
          overflow: 'hidden',
        }}
        placeholderStyle={styles.placeholderStyle}
        renderRightIcon={(isOpen) => (
          <FontAwesome5 name={isOpen ? `chevron-up` : 'chevron-down'} />
        )}
        data={data}
        labelField='label'
        valueField='value'
        placeholder='Kies onderwerp(en)'
        value={selectedFields}
        onChange={(item) => {
          return;
        }}
        renderItem={(item) => (
          <CheckboxItem
            item={item}
            checked={selectedFields.includes(item.value)}
            setSelectedFields={setSelectedFields}
          />
        )}
        activeColor='#FFFFFF'
        visibleSelectedItem={false}
      />
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginTop: 20,
  },
  dropdown: {
    height: 40,
    backgroundColor: '#E9F5E5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  selectedStyle: {
    borderRadius: 12,
  },
});
