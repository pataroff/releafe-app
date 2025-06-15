import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';

import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState<string>('');

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

  const handlePasswordReset = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      showToast(
        'error',
        'Ongeldig e-mailadres',
        'Voer een geldig e-mailadres in om je wachtwoord te resetten.'
      );
      return;
    }

    const success = await resetPassword(email);

    if (success) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.resetPasswordBox}>
        <Text style={styles.title}>Wachtwoord vergeten?</Text>
        <Text style={styles.subtitle}>
          Vul je e-mailadres in om een resetlink te ontvangen.
        </Text>

        <TextInput
          style={styles.textInputField}
          placeholderTextColor='#dedede'
          placeholder='Vul je e-mailadres in...'
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <Pressable style={styles.sendButton} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Verstuur resetlink</Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Terug</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetPasswordBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    width: windowWidth - 2 * 25,
    padding: 20,
  },
  title: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    marginTop: 10,
  } as TextStyle,
  subtitle: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  } as TextStyle,
  textInputField: {
    ...Fonts.sofiaProItalic[Platform.OS],
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingLeft: 15,
    marginTop: 20,
  } as TextStyle,
  sendButton: {
    backgroundColor: '#A9C1A1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 40,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'white',
  } as TextStyle,
  backButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
  },
  backButtonText: {
    color: '#999',
    textTransform: 'uppercase',
    fontSize: 16,
    ...Fonts.sofiaProBold[Platform.OS],
  } as TextStyle,
});
