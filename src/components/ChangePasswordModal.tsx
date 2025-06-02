import React, { SetStateAction, useState } from 'react';
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

interface ChangePasswordModalProps {
  changePasswordModalVisible: boolean;
  setChangePasswordModalVisible: React.Dispatch<SetStateAction<boolean>>;
  setIsUserClaimed: React.Dispatch<SetStateAction<boolean>>;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  changePasswordModalVisible,
  setChangePasswordModalVisible,
  setIsUserClaimed,
}) => {
  const { changePassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
          <Text style={styles.description}>
            Voer een nieuw wachtwoord in. Je hoeft het oude wachtwoord niet te
            kennen.
          </Text>

          <TextInput
            placeholder='Nieuw wachtwoord'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TextInput
            placeholder='Bevestig wachtwoord'
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <View style={styles.buttonWrapper}>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Wachtwoord wijzigen</Text>
            </Pressable>
          </View>
        </View>
      </View>
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
});
