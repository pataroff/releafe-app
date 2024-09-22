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

import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      {/* Main Container */}
      <View style={{ width: windowWidth - 2 * 25 }}>
        {/* Input Fields */}
        <View>
          <Text style={styles.textInputLabelText}>Email</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Enter your email...'
            autoCapitalize='none'
            onChangeText={(value) => setEmail(value)}
            value={email}
          ></TextInput>

          <Text style={styles.textInputLabelText}>Password</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Enter your password...'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          ></TextInput>
          <Pressable
            style={styles.signInButton}
            onPress={() => signIn(email, password)}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>

        <View style={styles.signUpBox}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInputLabelText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  textInputField: {
    ...Fonts.poppinsItalic[Platform.OS],
    height: 40,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 15,
  } as TextStyle,
  buttonText: {
    ...Fonts.poppinsBold[Platform.OS],
    textTransform: 'uppercase',
    fontSize: 16,
    color: 'white',
  } as TextStyle,
  signInButton: {
    backgroundColor: '#A9C1A1',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 8,
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
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
});
