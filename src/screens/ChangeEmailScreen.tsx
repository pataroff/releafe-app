import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext';
import { Fonts } from '../styles';

export const ChangeEmailScreen: React.FC = () => {
  const { changeEmail } = useAuth();

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

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

  const handleEmailChange = async () => {
    if (!newEmail || !confirmEmail) {
      showToast('error', 'Leeg veld', 'Vul alle velden in.');
      return;
    }

    if (newEmail !== confirmEmail) {
      showToast(
        'error',
        'E-mails komen niet overeen',
        'Controleer of beide e-mailadressen hetzelfde zijn.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      showToast(
        'error',
        'Ongeldig e-mailadres',
        'Voer een geldig e-mailadres in.'
      );
      return;
    }

    await changeEmail(newEmail);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nieuw e-mailadres</Text>
      <TextInput
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder='Voer nieuw e-mailadres in'
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
      />

      <Text style={styles.label}>Bevestig e-mailadres</Text>
      <TextInput
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        placeholder='Bevestig nieuw e-mailadres'
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleEmailChange}>
        <Text style={styles.buttonText}>E-mailadres wijzigen</Text>
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
  label: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
    marginBottom: 5,
  } as TextStyle,
  input: {
    ...Fonts.sofiaProItalic[Platform.OS],
    height: 40,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingLeft: 15,
    marginBottom: 15,
  } as TextStyle,
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
