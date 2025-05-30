import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '../lib/pocketbase';

import { AuthModel } from 'pocketbase';
import { IUserData, IAuthContext } from '../types';

import Toast from 'react-native-toast-message';

// Create context
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

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
      await pb.collection('users').authWithPassword(email, password);
      setUser(pb.authStore.isValid ? pb.authStore.model : null);
      setIsLoggedIn(pb.authStore.isValid);
    } catch (error) {
      console.error('Error: ', error);

      if (error.response?.code === 400) {
        showToast(
          'error',
          'Inloggen mislukt',
          'Combinatie van e-mailadres en wachtwoord klopt niet.'
        );
      } else {
        showToast(
          'error',
          'Onverwachte fout',
          'Er is iets misgegaan. Probeer het opnieuw.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await pb.authStore.clear();
      setUser(null);
      setIsLoggedIn(false);

      showToast('success', 'Uitgelogd', 'Je bent succesvol uitgelogd.');
    } catch (error) {
      console.error('Error: ', error);
      showToast(
        'error',
        'Fout bij uitloggen',
        'Er is iets misgegaan tijdens het uitloggen.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // @TODO Proper account activation flow!
  const register = async ({
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
    birthDate,
    gender,
    postcode,
  }: IUserData) => {
    try {
      setIsLoading(true);
      await pb.collection('users').create({
        email: email.trim(),
        password,
        passwordConfirm,
        firstName: firstName.trim() ?? '',
        lastName: lastName.trim() ?? '',
        birthDate,
        gender,
        postcode: postcode.trim() ?? '',
      });

      showToast('success', 'Account aangemaakt', 'Je kunt nu inloggen.');
    } catch (error) {
      console.error('Error: ', error);
      showToast(
        'error',
        'Account aanmaken mislukt',
        'Controleer je gegevens of probeer het later opnieuw.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    if (!pb.authStore.isValid || !user) {
      showToast(
        'error',
        'Niet ingelogd',
        'Log eerst in om deze actie uit te voeren.'
      );
      return;
    }

    try {
      setIsLoading(true);

      await pb.collection('users').update(user.id, {
        oldPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      });

      showToast(
        'success',
        'Wachtwoord gewijzigd',
        'Je wachtwoord is succesvol gewijzigd.'
      );

      // Log the user out after changing the password
      await signOut();
    } catch (error) {
      console.error('Change password error: ', error);

      showToast(
        'error',
        'Mislukt',
        'Het wijzigen van het wachtwoord is mislukt.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changeEmail = async (newEmail: string) => {
    if (!pb.authStore.isValid || !user) {
      showToast(
        'error',
        'Niet ingelogd',
        'Log eerst in om deze actie uit te voeren.'
      );
      return;
    }

    console.log(newEmail);

    try {
      setIsLoading(true);

      await pb.collection('users').requestEmailChange(newEmail);

      showToast(
        'success',
        'E-mailadres gewijzigd',
        'Je e-mailadres is succesvol aangepast.'
      );
    } catch (error) {
      console.error('Change email error: ', error);
      showToast(
        'error',
        'Mislukt',
        'Het wijzigen van het e-mailadres is mislukt.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changeBirthDate = async (newBirthDate: Date) => {
    if (!pb.authStore.isValid || !user) {
      showToast('error', 'Niet ingelogd', 'Log eerst in om door te gaan.');
      return;
    }

    try {
      setIsLoading(true);

      await pb.collection('users').update(user.id, {
        birthDate: newBirthDate,
      });

      showToast(
        'success',
        'Geboortedatum gewijzigd',
        'Je geboortedatum is succesvol aangepast.'
      );
    } catch (error) {
      console.error('Change birth date error: ', error);
      showToast(
        'error',
        'Mislukt',
        'Het wijzigen van de geboortedatum is mislukt.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedFields: Partial<IUserData>) => {
    if (!pb.authStore.isValid || !user) {
      showToast('error', 'Niet ingelogd', 'Log eerst in om door te gaan.');
      return;
    }

    try {
      setIsLoading(true);

      const updated = await pb
        .collection('users')
        .update(user.id, updatedFields);

      setUser(updated); // update context with latest user data

      showToast(
        'success',
        'Profiel bijgewerkt',
        'Je gegevens zijn succesvol aangepast.'
      );
    } catch (error) {
      console.error('Update user error:', error);
      showToast('error', 'Mislukt', 'Het bijwerken van je profiel is mislukt.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (password: string) => {
    if (!pb.authStore.isValid || !user) {
      showToast(
        'error',
        'Niet ingelogd',
        'Log eerst in om je account te verwijderen.'
      );
      return;
    }

    try {
      setIsLoading(true);

      // Re-authenticate the user
      await pb.collection('users').authWithPassword(user.email, password);

      // Delete the account if password is correct
      await pb.collection('users').delete(user.id);

      showToast(
        'success',
        'Account verwijderd',
        'Je account is succesvol verwijderd.'
      );

      await signOut();
    } catch (error: any) {
      console.error('Delete account error:', error);

      if (error?.status === 401) {
        showToast(
          'error',
          'Onjuist wachtwoord',
          'Het ingevoerde wachtwoord is niet correct.'
        );
      } else {
        showToast(
          'error',
          'Mislukt',
          'Er is iets misgegaan bij het verwijderen van je account.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        register,
        changePassword,
        changeEmail,
        changeBirthDate,
        updateUser,
        deleteUser,
        isLoading,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
