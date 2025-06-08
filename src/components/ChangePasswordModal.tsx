import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  TextStyle,
} from 'react-native';
import { Fonts } from '../styles';
import Toast from 'react-native-toast-message';

import { useAuth } from '../context/AuthContext';
import { toastConfig } from '../utils/toastConfig';

import Feather from 'react-native-vector-icons/Feather';

interface ChangePasswordModalProps {
  changePasswordModalVisible: boolean;
  setChangePasswordModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserClaimed: React.Dispatch<React.SetStateAction<boolean>>;
}

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const DIGIT_REGEX = /[0-9]/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
const MIN_PASSWORD_LENGTH = 8;

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  changePasswordModalVisible,
  setChangePasswordModalVisible,
  setIsUserClaimed,
}) => {
  const { changePassword } = useAuth();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassowrd] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassowrd] =
    useState<boolean>(false);

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

  const handleConfirm = async () => {
    if (!password || !confirmPassword) {
      showToast(
        'error',
        'Wachtwoord vereist',
        'Vul beide velden in om door te gaan.'
      );
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      showToast(
        'error',
        'Wachtwoord te kort',
        `Je wachtwoord moet minimaal ${MIN_PASSWORD_LENGTH} tekens lang zijn.`
      );
      return;
    }

    if (!UPPERCASE_REGEX.test(password)) {
      showToast(
        'error',
        'Hoofdletter vereist',
        'Je wachtwoord moet minimaal één hoofdletter bevatten.'
      );
      return;
    }

    if (!LOWERCASE_REGEX.test(password)) {
      showToast(
        'error',
        'Kleine letter vereist',
        'Je wachtwoord moet minimaal één kleine letter bevatten.'
      );
      return;
    }

    if (!DIGIT_REGEX.test(password)) {
      showToast(
        'error',
        'Cijfer vereist',
        'Je wachtwoord moet minimaal één cijfer bevatten.'
      );
      return;
    }

    if (!SPECIAL_CHAR_REGEX.test(password)) {
      showToast(
        'error',
        'Speciaal teken vereist',
        'Je wachtwoord moet minimaal één speciaal teken bevatten (bijv. !@#$%).'
      );
      return;
    }

    if (password !== confirmPassword) {
      showToast(
        'error',
        'Wachtwoorden komen niet overeen',
        'Controleer je invoer en probeer opnieuw.'
      );
      return;
    }

    const success = await changePassword(password, confirmPassword);
    if (success) {
      setChangePasswordModalVisible(false);
      setIsUserClaimed(true);
    }
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={changePasswordModalVisible}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Stel nieuw wachtwoord in</Text>
          <Text style={styles.description}>Voer een nieuw wachtwoord in.</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='Nieuw wachtwoord'
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <Pressable
              onPress={() => setShowPassowrd(!showPassword)}
              style={styles.iconContainer}
            >
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color='#aaa'
              />
            </Pressable>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='Bevestig wachtwoord'
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
            <Pressable
              onPress={() => setShowConfirmPassowrd(!showConfirmPassword)}
              style={styles.iconContainer}
            >
              <Feather
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color='#aaa'
              />
            </Pressable>
          </View>

          <View style={styles.buttonWrapper}>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Wachtwoord wijzigen</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    gap: 20,
  },
  title: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 20,
    color: '#333',
  } as TextStyle,
  description: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
    color: '#666',
  } as TextStyle,
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  buttonWrapper: {
    gap: 15,
  },
  confirmButton: {
    backgroundColor: '#F08080',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    color: '#fff',
  } as TextStyle,
  cancelButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  cancelText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
    color: '#666',
  } as TextStyle,
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 20,
    transform: [{ translateY: -10 }],
  },
});
