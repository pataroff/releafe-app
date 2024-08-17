import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Category } from '../types';

interface IIcon {
  label: string;
  value: string;
  icon: React.ReactElement;
}

const icons: IIcon[] = [
  {
    label: 'Werk',
    value: 'werk',
    icon: <FontAwesome6 name='suitcase' size={20} color='black' />,
  },
  {
    label: 'Gezondheid',
    value: 'gezondheid',
    icon: <FontAwesome5 name='plus' size={20} color='black' />,
  },
  {
    label: 'Relaties',
    value: 'relaties',
    icon: <FontAwesome name='heart' size={20} color='black' />,
  },
];

const getIcon = (selectedValue: string | null) => {
  const selectedItem = icons.find((icon) => icon.value === selectedValue);
  return selectedItem ? selectedItem.icon : null;
};

const getCategory = (category: string) => {
  switch (category) {
    case 'werk':
      return Category.Work;
    case 'gezondheid':
      return Category.Health;
    case 'relaties':
      return Category.Relationships;
  }
};

interface DropdownComponentProps {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
}

export const DropdownComponent: React.FC<DropdownComponentProps> = ({
  category,
  setCategory,
}) => {
  const [value, setValue] = useState<string>('werk');

  const customDropdownItem = (item: IIcon) => {
    return (
      <View style={styles.item}>
        {item.icon}
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        iconColor='black'
        data={icons}
        maxHeight={300}
        // labelField='label'
        valueField='value'
        placeholder=''
        value={value}
        onChange={(item) => {
          setValue(item.value);
          setCategory(getCategory(item.value));
        }}
        renderLeftIcon={() => getIcon(value)}
        renderItem={customDropdownItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '20%',
  },
  dropdown: {
    height: 30,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 4,
  },
  dropdownContainer: {
    width: '80%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    zIndex: 999,
    paddingLeft: 12,
    fontSize: 14,
  },
});
