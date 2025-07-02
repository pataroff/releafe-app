import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';

import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

import Feather from '@expo/vector-icons/Feather';

export const LoginForm = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      {/* Main Container */}
      <View style={styles.container}>
        {/* Input Fields */}
        <View>
          <Text style={styles.textInputLabelText}>E-mail</Text>
          <TextInput
            style={styles.textInputField}
            autoCapitalize='none'
            placeholder='Vul je e-mailadres in...'
            placeholderTextColor='gainsboro'
            onChangeText={(value) => setEmail(value)}
            value={email}
          />

          <Text style={styles.textInputLabelText}>Wachtwoord</Text>
          <View
            style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
          >
            <TextInput
              style={styles.textInputField}
              placeholder='Vul je wachtwoord in...'
              placeholderTextColor='gainsboro'
              autoCapitalize='none'
              secureTextEntry={!show}
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
            <Pressable
              onPress={() => setShow(!show)}
              style={styles.iconContainer}
            >
              <Feather name={show ? 'eye-off' : 'eye'} size={20} color='#aaa' />
            </Pressable>
          </View>

          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Wachtwoord vergeten?</Text>
          </Pressable>

          <Pressable
            style={styles.signInButton}
            onPress={() => signIn(email, password)}
          >
            <Text style={styles.buttonText}>Inloggen</Text>
          </Pressable>
        </View>

        <View style={styles.signUpBox}>
          <Text style={styles.signUpText}>Nog geen account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpCTAText}> Account activieren</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    padding: 30,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  textInputLabelText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  textInputField: {
    ...Fonts.sofiaProItalic[Platform.OS],
    height: 40,
    width: '100%',
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
    height: 35,
    marginTop: 10,
  },
  signUpBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingVertical: 20,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  signUpText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  signUpCTAText: {
    color: '#A9C1A1',
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
  forgotPasswordText: {
    color: '#A9C1A1',
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 10,
    fontSize: 14,
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
});
