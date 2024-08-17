import React, { createContext, useState, useEffect } from 'react';
import pb from '../lib/pocketbase';

import { AuthModel } from 'pocketbase';
import { IUserData, IAuthContext } from '../types';

// TODO: Make usage of the `pb_auth` item in local storage!
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        email,
        password,
        passwordConfirm,
        firstName: firstName ?? '',
        lastName: lastName ?? '',
      });
    } catch (error) {
      console.error('Error: ', error);
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
