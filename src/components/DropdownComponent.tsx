import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TextStyle,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { Fonts } from '../styles';
import { Category, IIcon } from '../types';

const icons: IIcon[] = [
  {
    label: 'Gezin en relaties',
    value: 'gezin en relaties',
    icon: (
      <Image
        style={{
          height: 24,
          width: 24,
        }}
        source={require('../../assets/images/dropdown_icons/dropdown_icon_gezin_en_relaties.png')}
        resizeMode='contain'
      />
    ),
  },
  {
    label: 'Gezondheid',
    value: 'gezondheid',
    icon: (
      <Image
        style={{
          height: 24,
          width: 24,
        }}
        source={require('../../assets/images/dropdown_icons/dropdown_icon_gezondheid.png')}
        resizeMode='contain'
      />
    ),
  },
  {
    label: 'Werk',
    value: 'werk',
    icon: (
      <Image
        style={{
          height: 24,
          width: 24,
        }}
        source={require('../../assets/images/dropdown_icons/dropdown_icon_work.png')}
        resizeMode='contain'
      />
    ),
  },
  {
    label: 'Onderwijs',
    value: 'onderwijs',
    icon: (
      <Image
        style={{
          height: 24,
          width: 24,
        }}
        source={require('../../assets/images/dropdown_icons/dropdown_icon_onderwijs.png')}
        resizeMode='contain'
      />
    ),
  },
  {
    label: 'Financiën',
    value: 'financiën',
    icon: (
      <Image
        style={{
          height: 24,
          width: 24,
        }}
        source={require('../../assets/images/dropdown_icons/dropdown_icon_financien.png')}
        resizeMode='contain'
      />
    ),
  },
  {
    label: 'Overig',
    value: 'overig',
    icon: (
      <Image
        style={{
          height: 24,
          width: 24,
        }}
        source={require('../../assets/images/dropdown_icons/dropdown_icon_overig.png')}
        resizeMode='contain'
      />
    ),
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
    case 'gezin en relaties':
      return Category.Relationships;
    case 'onderwijs':
      return Category.Education;
    case 'financiën':
      return Category.Finance;
    case 'overig':
      return Category.Other;
    default:
      return Category.Other;
  }
};

const categoryToString = (category: Category) => {
  switch (category) {
    case Category.Work:
      return 'werk';
    case Category.Health:
      return 'gezondheid';
    case Category.Relationships:
      return 'gezin en relaties';
    case Category.Education:
      return 'onderwijs';
    case Category.Finance:
      return 'financiën';
    case Category.Other:
      return 'overig';
    default:
      return 'overig';
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
  const [value, setValue] = useState<string>(categoryToString(category));

  const CustomDropdownItem = (item: IIcon) => {
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
        iconColor='white'
        iconStyle={styles.icon}
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
        renderItem={CustomDropdownItem}
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
    height: 60,
    width: 60,
    backgroundColor: '#EDF8E9',
    borderRadius: 10,
    paddingLeft: 18,
    paddingRight: 5,
  },
  dropdownContainer: {
    width: '50%',
    backgroundColor: '#EDF8E9',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#EDF8E9',
  },
  label: {
    zIndex: 999,
    paddingLeft: 12,
    fontSize: 14,
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
  icon: {
    position: 'absolute',
    right: -35,
    height: 30,
    width: 30,
    backgroundColor: '#C1D6BA',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  image: {
    width: 10,
    height: 10,
  },
});
