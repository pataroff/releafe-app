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
      setUser(isLoggedIn ? pb.authStore.record : null);
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
      setUser(pb.authStore.isValid ? pb.authStore.record : null);
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

      // showToast('success', 'Uitgelogd', 'Je bent succesvol uitgelogd.');
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

  const activate = async ({
    email,
    otpId,
    otp,
    firstName,
    lastName,
    birthDate,
    gender,
    postcode,
  }: IUserData) => {
    if (!otpId || !otp) {
      showToast(
        'error',
        'Activatie mislukt',
        'OTP-gegevens ontbreken. Vraag een nieuwe OTP aan.'
      );
      return;
    }

    try {
      setIsLoading(true);
      const user = await pb.collection('users').authWithOTP(otpId, otp.trim());

      const updatedUser = await pb.collection('users').update(user.record.id, {
        email: email.trim(),
        firstName: firstName.trim() ?? '',
        lastName: lastName.trim() ?? '',
        birthDate,
        gender,
        postcode: postcode.trim() ?? '',
      });

      setUser(pb.authStore.isValid ? updatedUser : null);
      setIsLoggedIn(pb.authStore.isValid);

      // @WARN The delay is needed, so the <Toast /> inside the `ChangePasswordModal.tsx` has time to mount!
      // Otherwise, the internal ref used, points to the <Toast /> inside `App.tsx`, and the toast is rendered
      // underneath the modal!
      setTimeout(() => {
        showToast(
          'success',
          'Account geactiveerd',
          'Je account is geactiveerd en je bent ingelogd.'
        );
      }, 100);
    } catch (error) {
      console.error('Error: ', error);
      showToast(
        'error',
        'Activatie mislukt',
        'Kon je account niet activeren. Controleer je gegevens en probeer het opnieuw.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const requestOTP = async (email: string): Promise<string | undefined> => {
    try {
      await pb.collection('users').getFirstListItem(`email="${email.trim()}"`);
    } catch {
      showToast(
        'error',
        'E-mailadres niet gevonden',
        'Er bestaat geen gebruiker met dit e-mailadres.'
      );
      return undefined;
    }

    try {
      const result = await pb.collection('users').requestOTP(email.trim());
      showToast(
        'success',
        'OTP verzonden',
        'Er is een eenmalige code naar je e-mailadres gestuurd.'
      );
      return result.otpId;
    } catch (error) {
      console.error('OTP request failed:', error);
      showToast(
        'error',
        'OTP-aanvraag mislukt',
        'Kon geen OTP e-mail verzenden.'
      );
      return undefined;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      await pb.collection('users').requestPasswordReset(email);

      showToast(
        'success',
        'E-mail verzonden',
        'Controleer je inbox voor de resetlink.'
      );

      return true;
    } catch (error: any) {
      console.error('Reset password error:', error);

      showToast(
        'error',
        'Fout bij versturen',
        'Er is iets misgegaan bij het versturen van de resetlink. Probeer het later opnieuw.'
      );

      return false;
    }
  };

  const changePassword = async (
    newPassword: string,
    confirmNewPassword: string,
    oldPassword?: string
  ) => {
    if (!pb.authStore.isValid || !user) {
      showToast(
        'error',
        'Niet ingelogd',
        'Log eerst in om deze actie uit te voeren.'
      );
      return false;
    }

    try {
      setIsLoading(true);

      // Get fresh user data to check `isClaimed`
      const currentUser = await pb.collection('users').getOne(user.id);

      if (currentUser.isClaimed === true) {
        // If user has changed their password before, require `oldPassword`
        if (!oldPassword) {
          showToast(
            'error',
            'Oud wachtwoord vereist',
            'Voer je oude wachtwoord in.'
          );
          return false;
        }

        try {
          await pb
            .collection('users')
            .authWithPassword(user.email, oldPassword);
        } catch {
          showToast(
            'error',
            'Ongeldig wachtwoord',
            'Het oude wachtwoord is onjuist.'
          );
          return false;
        }
      }

      // Proceed with password update
      const updatedUserData = {
        password: newPassword,
        passwordConfirm: confirmNewPassword,
        isClaimed: true, // Mark that they’ve claimed the account
      };

      await pb.collection('users').update(user.id, updatedUserData);

      showToast(
        'success',
        'Wachtwoord gewijzigd',
        'Je wachtwoord is succesvol gewijzigd.'
      );

      // Log the user out after changing the password
      await signOut();
      return true;
    } catch (error) {
      console.error('Change password error: ', error);

      showToast(
        'error',
        'Mislukt',
        'Het wijzigen van het wachtwoord is mislukt.'
      );
      return false;
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
        activate,
        requestOTP,
        resetPassword,
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
