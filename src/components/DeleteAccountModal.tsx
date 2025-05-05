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

interface DeleteAccountModalProps {
  visible: boolean;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [password, setPassword] = useState('');

  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Account verwijderen</Text>
          <Text style={styles.description}>
            Deze actie is onomkeerbaar. Voer je wachtwoord in om je account te
            verwijderen.
          </Text>

          <TextInput
            placeholder='Wachtwoord'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.confirmButton}
              onPress={() => onConfirm(password)}
            >
              <Text style={styles.confirmText}>Ja, verwijder mijn account</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Annuleren</Text>
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
