// This package requires additional imports on React Native! 👇🏻
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TextStyle,
  Pressable,
} from 'react-native';
import { Picker } from 'react-native-web';
import { Fonts, Typography } from '../styles';

import { GlobalContext } from '../context/GlobalState';

export const AddDiaryEntry: React.FC = () => {
  const [diaryEntryTitle, setDiaryEntryTitle] = useState('');
  const [diaryEntryBody, setDiaryEntryBody] = useState('');
  const [diaryEntryType, setDiaryEntryType] = useState('neutral');

  const { addDiaryEntry } = useContext(GlobalContext);

  const handleSubmit = () => {
    const newDiaryEntry = {
      id: uuidv4(),
      type: diaryEntryType.toLowerCase(),
      title: diaryEntryTitle,
      body: diaryEntryBody,
    };

    addDiaryEntry(newDiaryEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.addDiaryEntryLabel}>Add new diary entry</Text>
      <View>
        <Text style={styles.diaryEntryFieldLabel}>Diary Entry Title</Text>
        <TextInput
          style={styles.diaryEntryFieldTextInput}
          placeholder='Please enter a diary entry title'
          onChangeText={setDiaryEntryTitle}
          value={diaryEntryTitle}
        />
      </View>
      <View>
        <Text style={styles.diaryEntryFieldLabel}>Diary Entry Body</Text>
        <TextInput
          style={styles.diaryEntryFieldTextInput}
          placeholder='Please enter a diary entry body'
          onChangeText={setDiaryEntryBody}
          value={diaryEntryBody}
        />
      </View>
      <View>
        <Text style={styles.diaryEntryFieldLabel}>Diary Entry Type</Text>
        {/* This picker isn't cross-platform interoperable! 👇🏻 */}
        <Picker
          style={styles.diaryEntryFieldTextInput}
          selectedValue={diaryEntryType}
          onValueChange={(value: string) => setDiaryEntryType(value)}
        >
          <Picker.Item label='Neutral' value='neutral' />
          <Picker.Item label='Positive' value='positive' />
          <Picker.Item label='Negative' value='negative' />
        </Picker>
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add a diary entry</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
  },
  addDiaryEntryLabel: {
    ...Typography.h3,
  } as TextStyle,
  diaryEntryFieldLabel: {
    marginTop: 10,
    marginHorizontal: 0,
    fontSize: 18,
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  diaryEntryFieldTextInput: {
    marginTop: 10,
    marginHorizontal: 0,
    fontSize: 14,
    ...Fonts.poppinsLight[Platform.OS],
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#dedede',
    paddingVertical: 5,
    paddingLeft: 15,
  } as TextStyle,
  button: {
    marginTop: 20,
    paddingVertical: 5,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
});
