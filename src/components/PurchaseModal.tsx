import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import Toast from 'react-native-toast-message';

interface PurchaseModalProps {
  visible: boolean;
  price: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  visible,
  price,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Aankoop voltooien</Text>
          <Text style={styles.description}>
            Wil je deze upgrade voor jouw bonsaiboom kopen voor {price}{' '}
            Releafe-punten?
          </Text>

          <View style={styles.buttonWrapper}>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Ja, ik wil dit kopen</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Nee, annuleren</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Toast/>
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
  buttonWrapper: {
    gap: 15,
  },
  confirmButton: {
    backgroundColor: '#C1DEBE',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    color: '#333',
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
