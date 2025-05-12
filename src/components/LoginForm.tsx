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

import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const LoginForm = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      {/* Main Container */}
      <View style={{ width: windowWidth - 2 * 25 }}>
        {/* Input Fields */}
        <View>
          <Text style={styles.textInputLabelText}>E-mail</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Vul je e-mailadres in...'
            autoCapitalize='none'
            onChangeText={(value) => setEmail(value)}
            value={email}
          ></TextInput>

          <Text style={styles.textInputLabelText}>Wachtwoord</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Vul je wachtwoord in...'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          ></TextInput>
          <Pressable
            style={styles.signInButton}
            onPress={() => signIn(email, password)}
          >
            <Text style={styles.buttonText}>Inloggen</Text>
          </Pressable>
        </View>

        <View style={styles.signUpBox}>
          <Text>Nog geen account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}> Account activieren</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  },
  signUpText: {
    color: '#A9C1A1',
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
});
