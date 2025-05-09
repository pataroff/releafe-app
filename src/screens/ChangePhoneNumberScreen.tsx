import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  TextStyle,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { Fonts } from '../styles';

export const ChangePhoneNumberScreen: React.FC = () => {
  const { changePhoneNumber } = useAuth();

  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');

  // Show toast messages modularly
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

  // Function to handle validation
  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/; // This allows only numbers and an optional "+" at the start
    return phoneRegex.test(phoneNumber);
  };

  // Function to handle phone number change
  const handleChangePhoneNumber = async () => {
    if (!validatePhoneNumber(newPhoneNumber)) {
      showToast(
        'error',
        'Ongeldig Telefoonnummer',
        'Alleen nummers en een optioneel "+" zijn toegestaan.'
      );
      return;
    }

    await changePhoneNumber(newPhoneNumber); // Call the changePhoneNumber from context
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nieuw telefoonnummer</Text>
      <TextInput
        style={styles.input}
        placeholder='Vul je nieuwe telefoonnummer in...'
        value={newPhoneNumber}
        onChangeText={setNewPhoneNumber}
        keyboardType='phone-pad'
      />

      <Pressable style={styles.button} onPress={handleChangePhoneNumber}>
        <Text style={styles.buttonText}>Wijzig telefoonnummer</Text>
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
