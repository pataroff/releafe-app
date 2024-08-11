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

import { IUserData } from '../types';

const windowWidth = Dimensions.get('window').width;

export const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  // TODO: Is there a better way to declare parameters types here?
  const handleRegister = (
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string
  ) => {
    const userData: IUserData = {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
    };

    register(userData);
    navigation.navigate('Login');
  };

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

          <Text style={styles.textInputLabelText}>First Name</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Enter your first name...'
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
          ></TextInput>
          <Text style={styles.textInputLabelText}>Last Name</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Enter your last name...'
            onChangeText={(value) => setLastName(value)}
            value={lastName}
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
          <Text style={styles.textInputLabelText}>Confirm Password</Text>
          <TextInput
            style={styles.textInputField}
            placeholder='Enter your password...'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(value) => setPasswordConfirm(value)}
            value={passwordConfirm}
          ></TextInput>

          <Pressable
            style={styles.signInButton}
            onPress={() =>
              handleRegister(
                email,
                password,
                passwordConfirm,
                firstName,
                lastName
              )
            }
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>

        <View style={styles.signUpBox}>
          <Text>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpText}> Sign In</Text>
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
    height: 30,
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
    backgroundColor: '#00d8bd',
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
    color: '#00d8bd',
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
});
