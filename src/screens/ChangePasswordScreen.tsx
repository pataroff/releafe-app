import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { useAuth } from '../context/AuthContext';
import { Fonts } from '../styles';
import Toast from 'react-native-toast-message';

const windowHeight = Dimensions.get('window').height;
const isSmallerScreen = windowHeight <= 667;

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const DIGIT_REGEX = /[0-9]/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
const MIN_PASSWORD_LENGTH = 8;

export const ChangePasswordScreen: React.FC = () => {
  const { changePassword } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      showToast('error', 'Leeg veld', 'Vul alle velden in.');
      return;
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      showToast(
        'error',
        'Wachtwoord te kort',
        `Het nieuwe wachtwoord moet minstens ${MIN_PASSWORD_LENGTH} tekens lang zijn.`
      );
      return;
    }

    if (!UPPERCASE_REGEX.test(newPassword)) {
      showToast(
        'error',
        'Hoofdletter vereist',
        'Het nieuwe wachtwoord moet minimaal één hoofdletter bevatten.'
      );
      return;
    }

    if (!LOWERCASE_REGEX.test(newPassword)) {
      showToast(
        'error',
        'Kleine letter vereist',
        'Het nieuwe wachtwoord moet minimaal één kleine letter bevatten.'
      );
      return;
    }

    if (!DIGIT_REGEX.test(newPassword)) {
      showToast(
        'error',
        'Cijfer vereist',
        'Het nieuwe wachtwoord moet minimaal één cijfer bevatten.'
      );
      return;
    }

    if (!SPECIAL_CHAR_REGEX.test(newPassword)) {
      showToast(
        'error',
        'Speciaal teken vereist',
        'Het nieuwe wachtwoord moet minimaal één speciaal teken bevatten (bijv. !@#$%).'
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast(
        'error',
        'Wachtwoorden komen niet overeen',
        'Controleer of beide nieuwe wachtwoorden hetzelfde zijn.'
      );
      return;
    }

    await changePassword(oldPassword, newPassword, confirmNewPassword);
  };

  const renderPasswordInput = (
    label: string,
    value: string,
    setValue: (val: string) => void,
    show: boolean,
    setShow: (val: boolean) => void,
    placeholder: string
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={value}
          onChangeText={(value) => setValue(value)}
          secureTextEntry={!show}
          placeholder={placeholder}
          style={styles.input}
        />
        <Pressable onPress={() => setShow(!show)} style={styles.iconContainer}>
          <Feather name={show ? 'eye-off' : 'eye'} size={20} color='#aaa' />
        </Pressable>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {renderPasswordInput(
        'Oude wachtwoord',
        oldPassword,
        setOldPassword,
        showOld,
        setShowOld,
        'Voer je oude wachtwoord in'
      )}
      {renderPasswordInput(
        'Nieuw wachtwoord',
        newPassword,
        setNewPassword,
        showNew,
        setShowNew,
        'Minstens 8 tekens'
      )}
      {renderPasswordInput(
        'Bevestig nieuw wachtwoord',
        confirmNewPassword,
        setConfirmNewPassword,
        showConfirm,
        setShowConfirm,
        'Voer opnieuw in'
      )}

      <Pressable style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Wachtwoord wijzigen</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 30,
    paddingTop: isSmallerScreen ? 105 : 145,
    backgroundColor: 'trasnparent',
    flex: 1,
  },
  label: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  input: {
    ...Fonts.sofiaProItalic[Platform.OS],
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 40, // extra space for icon
    marginTop: 10,
    marginBottom: 15,
  } as TextStyle,
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 30,
    transform: [{ translateY: -10 }],
  },
  button: {
    backgroundColor: '#A9C1A1',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
    color: 'white',
  } as TextStyle,
});
