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

interface NotEnoughPointsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NotEnoughPointsModal: React.FC<NotEnoughPointsModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Niet voldoende punten</Text>
          <Text style={styles.description}>
            Helaas, je dient meer Releafe-punten te verdienen om deze aankoop te
            doen.
          </Text>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Afsluiten</Text>
          </Pressable>
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

  closeButton: {
    backgroundColor: '#C1DEBE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    minWidth: 120,
  },
  closeText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    color: '#333',
  } as TextStyle,
});
