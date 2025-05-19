import React, { SetStateAction, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;

interface CloseModalProps {
  closeModalVisible: boolean;
  setCloseModalVisible: React.Dispatch<SetStateAction<boolean>>;
  parentModalVisible?: boolean;
  setParentModalVisible?: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  handleClose?: (index?: number) => void;
  route?: any;
  denyText: string;
  confirmText: string;
  closeButtonDisabled?: boolean;
  isSpecialModal?: boolean;
}

export const CloseModal: React.FC<CloseModalProps> = ({
  closeModalVisible,
  setCloseModalVisible,
  parentModalVisible,
  setParentModalVisible,
  title,
  description,
  handleClose,
  route,
  denyText,
  confirmText,
  closeButtonDisabled = false,
  isSpecialModal = false,
}) => {
  const handleCloseModal = () => {
    setCloseModalVisible(!closeModalVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      // @ts-ignore
      handleClose();
    }, 100);
  };

  const handleParentCloseModal = () => {
    setCloseModalVisible(!closeModalVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      setParentModalVisible(!parentModalVisible);
    }, 100);
  };

  const handleDiaryCloseModal = (index: number) => {
    setCloseModalVisible(!closeModalVisible);
    setTimeout(() => {
      // @ts-ignore
      handleClose(index);
    }, 100);
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={closeModalVisible}
      onRequestClose={() => setCloseModalVisible(!setCloseModalVisible)}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <View style={{ rowGap: 20 }}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.title}>{title}</Text>
                <Pressable
                  onPress={() => setCloseModalVisible(!closeModalVisible)}
                >
                  <Feather name='x-circle' size={24} color='gray' />
                </Pressable>
              </View>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>

          <View style={{ rowGap: 15 }}>
            <Pressable
              disabled={closeButtonDisabled}
              style={
                isSpecialModal
                  ? [styles.confirmButton, { backgroundColor: '#eee' }]
                  : styles.confirmButton
              }
              onPress={() =>
                route?.name === 'Diary1'
                  ? handleDiaryCloseModal(0) // Save and Close
                  : setCloseModalVisible(!closeModalVisible)
              }
            >
              <Text style={styles.confirmText}>{denyText}</Text>
            </Pressable>
            <Pressable
              style={
                isSpecialModal
                  ? [styles.cancelButton, { backgroundColor: '#F08080' }]
                  : styles.cancelButton
              }
              onPress={() =>
                handleClose !== undefined
                  ? route?.name === 'Diary1'
                    ? handleDiaryCloseModal(1) // Don't Save and Close
                    : handleCloseModal()
                  : handleParentCloseModal()
              }
            >
              <Text
                style={
                  isSpecialModal
                    ? [styles.cancelText, { color: '#eee' }]
                    : styles.cancelText
                }
              >
                {confirmText}
              </Text>
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
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    color: '#666',
  } as TextStyle,
});
