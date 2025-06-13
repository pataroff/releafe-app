import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  TextStyle,
} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Fonts } from '../styles';
import { Gender } from '../types';

import { Dropdown } from 'react-native-element-dropdown';

type BaseProps = {
  label: string;
  type: 'text' | 'date' | 'dropdown';
  editable?: boolean;
};

type TextProps = BaseProps & {
  type: 'text';
  value: string;
  onChangeText?: (text: string) => void;
  onPress?: never;
};

type DateProps = BaseProps & {
  type: 'date';
  value: string | null;
  onPress: () => void;
  onChangeText?: never;
};

type DropdownProps = BaseProps & {
  type: 'dropdown';
  value: Gender | null | string;
  onPress: (value: Gender | null) => void;
  onChangeText?: never;
};

type EditableSettingsInputProps = TextProps | DateProps | DropdownProps;

const genderOptions = [
  { label: 'Man', value: Gender.Male },
  { label: 'Vrouw', value: Gender.Female },
  { label: 'Anders', value: Gender.Other },
];

export const EditableSettingsInput: React.FC<EditableSettingsInputProps> = ({
  label,
  value,
  onChangeText,
  onPress,
  type,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    switch (type) {
      case 'date':
        onPress();
        break;
      case 'dropdown':
        setIsEditing(!isEditing);
        break;
      case 'text':
        setIsEditing(!isEditing);
        break;
    }
  };

  const renderIcon = () => {
    if (!editable) return null;

    return (
      <MaterialCommunityIcons
        name={isEditing ? 'check' : 'pencil'}
        size={20}
        color={isEditing ? 'green' : 'black'}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textInputLabelText}>{label}</Text>

      {type === 'dropdown' && (
        <Dropdown
          style={[styles.dropdown, { backgroundColor: '#F7F7F7' }]}
          placeholderStyle={styles.placeholderTextStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.label}
          iconColor='black'
          data={genderOptions}
          labelField='label'
          valueField='value'
          placeholder='Selecteer je geslacht...'
          value={value}
          onChange={(item) => onPress(item.value)}
        />
      )}

      {type === 'text' && (
        <View>
          <TextInput
            style={[
              styles.textInputField,
              { backgroundColor: isEditing ? '#FFFFFF' : '#F7F7F7' },
              { color: editable ? 'black' : 'gray' },
            ]}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize='none'
            editable={isEditing}
          />

          <Pressable
            onPress={handleEdit}
            style={[styles.iconWrapper, isEditing && styles.iconWrapperEditing]}
          >
            {renderIcon()}
          </Pressable>
        </View>
      )}

      {type === 'date' && (
        <Pressable onPress={onPress}>
          <View>
            <TextInput
              style={[styles.textInputField, { backgroundColor: '#F7F7F7' }]}
              value={value ?? ''}
              editable={false}
            />
          </View>

          <Pressable
            onPress={handleEdit}
            style={[styles.iconWrapper, isEditing && styles.iconWrapperEditing]}
          >
            {renderIcon()}
          </Pressable>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  textInputLabelText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
    color: 'gray',
  } as TextStyle,
  textInputField: {
    ...Fonts.sofiaProRegular[Platform.OS],
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 10,
  } as TextStyle,
  iconWrapper: {
    position: 'absolute',
    right: 0,
    top: 10,
    padding: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderColor: 'gainsboro',
  },
  iconWrapperEditing: {
    backgroundColor: '#F7F7F7',
  },
  dropdown: {
    height: 40,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
    marginTop: 10,
  },
  placeholderTextStyle: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
    color: '#999',
  } as TextStyle,
  selectedTextStyle: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  label: {
    zIndex: 999,
    fontSize: 14,
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
});
