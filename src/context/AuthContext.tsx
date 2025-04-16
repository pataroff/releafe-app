import React, { createContext, useState, useEffect } from 'react';
import pb from '../lib/pocketbase';

import { AuthModel } from 'pocketbase';
import { IUserData, IAuthContext } from '../types';

import Toast from 'react-native-toast-message';

// TODO: Make usage of the `pb_auth` item in local storage!
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Create context
export const AuthContext = createContext<IAuthContext>({
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  register: ({}: IUserData) => {},
  isLoading: false,
  isLoggedIn: false,
  user: null,
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthModel | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLoggedIn = pb.authStore.isValid;
      setIsLoggedIn(isLoggedIn);
      setUser(isLoggedIn ? pb.authStore.model : null);
    };

    checkAuthStatus();
  }, []);

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

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await pb
        .collection('users')
        .authWithPassword(email, password);
      setUser(pb.authStore.isValid ? pb.authStore.model : null);
      setIsLoggedIn(pb.authStore.isValid);
      setIsLoading(false);
    } catch (error) {
      console.error('Error: ', error);
      setIsLoading(false);

      if (error.response?.code === 400) {
        showToast('error', 'Sign In Failed', 'This account does not exist.');
      } else {
        showToast(
          'error',
          'Unexpected Error',
          'Something went wrong, try again.'
        );
      }
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await pb.authStore.clear();
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const register = async ({
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
  }: IUserData) => {
    try {
      const res = await pb.collection('users').create({
        email: email.trim(),
        password,
        passwordConfirm,
        firstName: firstName.trim() ?? '',
        lastName: lastName.trim() ?? '',
      });

      showToast('success', 'Account Created', 'You can now log in.');
    } catch (error) {
      console.error('Error: ', error);
      showToast('error', 'Sign Up Failed', 'Could not create account.');
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, register, isLoading, isLoggedIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
