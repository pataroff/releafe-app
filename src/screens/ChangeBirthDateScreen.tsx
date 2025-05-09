import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  TextInput,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';

import { useAuth } from '../context/AuthContext';

import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { FormInput } from '../components/FormInput';

export const ChangeBirthDateScreen: React.FC = () => {
  const { changeBirthDate } = useAuth();

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showToast = (
    type: 'error' | 'success' | 'info',
    title: string,
    message: string
  ) => {
    Toast.show({
      topOffset: 80,
      type,
      text1: title,
      text2: message,
    });
  };

  const handleConfirmDate = (date: Date) => {
    setBirthDate(date);
    setShowDatePicker(false);
  };

  const handleChangeBirthDate = async () => {
    if (!birthDate) {
      showToast('error', 'Geboortedatum ontbreekt', 'Selecteer een datum.');
      return;
    }

    try {
      await changeBirthDate(birthDate);
      showToast('success', 'Succes', 'Geboortedatum gewijzigd.');
    } catch (err) {
      console.error('Birth date update error: ', err);
      showToast(
        'error',
        'Fout',
        'Er is iets misgegaan bij het wijzigen van je geboortedatum.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode='date'
        onConfirm={handleConfirmDate}
        onCancel={() => setShowDatePicker(false)}
        maximumDate={new Date()}
      />

      <FormInput
        label='Nieuw geboortedatum'
        placeholder='Selecteer je geboortedatum'
        value={birthDate ? birthDate.toLocaleDateString('nl-NL') : ''}
        onPress={() => setShowDatePicker(true)}
        editable={false}
      />

      <Pressable style={styles.button} onPress={handleChangeBirthDate}>
        <Text style={styles.buttonText}>Wijzig geboortedatum</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  button: {
    backgroundColor: '#A9C1A1',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
    color: 'white',
  } as TextStyle,
});
