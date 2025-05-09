import React, { useState, useContext } from 'react';

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
import { IUserData } from '../types';

import { AuthContext } from '../context/AuthContext';

import { useNavigation } from '@react-navigation/native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';

import { FormInput } from './FormInput';

const windowWidth = Dimensions.get('window').width;

export const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephoneNumber, setTelephoneNumber] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
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
      !telephoneNumber ||
      !password ||
      !passwordConfirm
    ) {
      return showToast('error', 'Ongeldige invoer', 'Vul alle velden in.');
    }

    if (!/^\+?\d{8,15}$/.test(telephoneNumber)) {
      return showToast(
        'error',
        'Ongeldig nummer',
        'Vul een geldig telefoonnummer in.'
      );
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
      telephoneNumber,
      birthDate,
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

      <FormInput
        label='E-mail'
        placeholder='Vul je e-mailadres in...'
        value={email}
        onChangeText={setEmail}
      />

      <FormInput
        label='Telefoonnummer'
        placeholder='Vul je telefoonnummer in...'
        value={telephoneNumber}
        onChangeText={setTelephoneNumber}
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
        <Text style={styles.buttonText}>Account aanmaken</Text>
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
    color: 'white',
  } as TextStyle,
  signInButton: {
    backgroundColor: '#A9C1A1',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 10,
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
});
