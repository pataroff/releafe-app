import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { Gender, IUserData } from '../types';

import { useAuth } from '../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';

import { FormInput } from './FormInput';

const windowWidth = Dimensions.get('window').width;

const genderOptions = [
  { label: 'Man', value: Gender.Male },
  { label: 'Vrouw', value: Gender.Female },
  { label: 'Anders', value: Gender.Other },
];

export const RegisterForm = () => {
  const { register } = useAuth();
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [postcode, setPostcode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

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

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthDate ||
      !gender ||
      !postcode ||
      !password ||
      !passwordConfirm
    ) {
      return showToast('error', 'Ongeldige invoer', 'Vul alle velden in.');
    }

    if (password.length < 8) {
      return showToast(
        'error',
        'Wachtwoord te kort',
        'Gebruik minstens 8 tekens.'
      );
    }

    if (password !== passwordConfirm) {
      return showToast(
        'error',
        'Wachtwoorden komen niet overeen',
        'Controleer je invoer.'
      );
    }

    const userData: IUserData = {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      birthDate,
      gender,
      postcode,
    };

    register(userData);
    navigation.navigate('Login');
  };

  const handleConfirmDate = (date: Date) => {
    setBirthDate(date);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode='date'
        maximumDate={new Date()}
        onConfirm={(date) => handleConfirmDate(date)}
        onCancel={() => setShowDatePicker(false)}
      />

      <FormInput
        label='Voornaam'
        placeholder='Vul je voornaam in...'
        value={firstName}
        onChangeText={setFirstName}
      />

      <FormInput
        label='Achternaam'
        placeholder='Vul je achternaam in...'
        value={lastName}
        onChangeText={setLastName}
      />

      <FormInput
        label='Geboortedatum'
        placeholder='Selecteer je geboortedatum'
        value={birthDate ? birthDate.toLocaleDateString('nl-NL') : ''}
        onPress={() => setShowDatePicker(true)}
        editable={false}
      />

      <Text style={styles.textInputLabelText}>Geslacht</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.label}
        data={genderOptions}
        labelField='label'
        valueField='value'
        placeholder='Selecteer je geslacht...'
        value={gender}
        onChange={(item) => setGender(item.value)}
      />

      <FormInput
        label='Postcode'
        placeholder='Vul je postcode in...'
        value={postcode}
        onChangeText={setPostcode}
        keyboardType='default'
        maxLength={6}
      />

      <FormInput
        label='E-mail'
        placeholder='Vul je e-mailadres in...'
        value={email}
        onChangeText={setEmail}
      />

      <FormInput
        label='Wachtwoord'
        placeholder='Vul je wachtwoord in...'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FormInput
        label='Bevestig wachtwoord'
        placeholder='Bevestig je wachtwoord...'
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />

      <Pressable style={styles.signInButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Account activieren</Text>
      </Pressable>

      <View style={styles.signUpBox}>
        <Text>Heb je al een account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}> Inloggen</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 60,
    width: windowWidth - 2 * 30,
  },
  textInputLabelText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  textInputField: {
    ...Fonts.sofiaProItalic[Platform.OS],
    verticalAlign: Platform.OS == 'android' ? 'top' : {},
    height: 40,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 15,
  } as TextStyle,
  buttonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'white',
  } as TextStyle,
  signInButton: {
    backgroundColor: '#A9C1A1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: '100%',
    height: 35,
    marginTop: 10,
  },
  signUpBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingVertical: 20,
    marginBottom: 20,
  },
  signUpText: {
    color: '#A9C1A1',
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
  dropdown: {
    height: 40,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  placeholderTextStyle: {
    ...Fonts.sofiaProItalic[Platform.OS],
    fontSize: 14,
    color: '#999',
  } as TextStyle,
  selectedTextStyle: {
    ...Fonts.sofiaProItalic[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  label: {
    zIndex: 999,
    fontSize: 14,
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
});
